(function () {
  const TABLE_ROW_LIMIT = 100;
  let analyticsDataVersion = 0;
  let analyticsCache = new Map();
  let monthsCache = null;

  injectPerformanceStyles();

  function injectPerformanceStyles() {
    if (document.getElementById("performanceFixStyles")) return;
    const style = document.createElement("style");
    style.id = "performanceFixStyles";
    style.textContent = `
      .table-limit-note {
        padding: 9px 12px;
        border-bottom: 1px solid #e5edf6;
        background: #f8fbff;
        color: #516070;
        font-size: 12px;
        font-weight: 800;
      }
    `;
    document.head.appendChild(style);
  }

  function forEachRawRow(callback) {
    state.raw.daily.forEach(callback);
    state.raw.campaign.forEach(callback);
    state.raw.job.forEach(callback);
  }

  function invalidateAnalyticsCache() {
    analyticsDataVersion += 1;
    analyticsCache = new Map();
    monthsCache = null;
  }

  function dateRangeFromRawData() {
    let minDate = "";
    let maxDate = "";
    forEachRawRow((row) => {
      if (!row.date) return;
      if (!minDate || row.date < minDate) minDate = row.date;
      if (!maxDate || row.date > maxDate) maxDate = row.date;
    });
    return { minDate, maxDate };
  }

  resetFiltersFromData = function () {
    const { minDate, maxDate } = dateRangeFromRawData();
    const startDate = minDate ? monthStartFromDate(minDate) : "";
    const endDate = maxDate ? monthEndFromDate(maxDate) : "";
    state.filters.startDate = startDate;
    state.filters.endDate = endDate;
    state.periods = createEmptyPeriods({ startDate, endDate });
    state.filters.campaign = "all";
    state.filters.jobType = "all";
    state.filters.employment = "all";
    state.filters.salaryType = "all";
    state.filters.area = "all";
    state.filters.status = "all";
    state.filters.keyword = "";
    state.cpPeriod.startMonth = minDate ? minDate.slice(0, 7) : "";
    state.cpPeriod.endMonth = maxDate ? maxDate.slice(0, 7) : "";
  };

  availableMonths = function () {
    if (!monthsCache) {
      const months = new Set();
      forEachRawRow((row) => {
        const month = row.date?.slice(0, 7);
        if (month) months.add(month);
      });
      monthsCache = [...months].sort((a, b) => String(a).localeCompare(String(b), "ja"));
    }
    return monthsCache;
  };

  aggregateBy = function (rows, keyFn, enrichFn, options = {}) {
    const keepRows = options.keepRows !== false;
    const trackJobKeys = options.trackJobKeys ?? !keepRows;
    const map = new Map();
    rows.forEach((row) => {
      const name = keyFn(row) || "未分類";
      const item = map.get(name) ?? {
        name,
        ...emptyMetrics(),
        ...(keepRows ? { rows: [] } : {}),
        ...(trackJobKeys ? { jobKeys: new Set() } : {})
      };
      item.impressions += row.impressions;
      item.clicks += row.clicks;
      item.starts += row.starts;
      item.applications += row.applications;
      item.cost += row.cost;
      item.jobCount += row.jobCount || 0;
      if (keepRows) item.rows.push(row);
      if (trackJobKeys) {
        const jobKey = row.jobId || row.jobTitle;
        if (jobKey) item.jobKeys.add(jobKey);
      }
      if (name.includes(" - ")) {
        const [startDate, endDate] = name.split(" - ");
        item.startDate = startDate;
        item.endDate = endDate;
      }
      map.set(name, item);
    });
    return [...map.values()].map((item) => {
      const uniqueJobs = item.jobKeys
        ? item.jobKeys.size
        : unique((item.rows || []).map((row) => row.jobId || row.jobTitle).filter(Boolean)).length;
      if (uniqueJobs) item.jobCount = uniqueJobs;
      const finalized = finalize(item);
      if (!keepRows) delete finalized.rows;
      if (finalized.jobKeys) delete finalized.jobKeys;
      return enrichFn ? enrichFn(finalized) : finalized;
    });
  };

  function analyticsTabForView(tab = state.activeTab) {
    const activeTab = canonicalTab(tab);
    if (activeTab === "target" || activeTab === "market") return "job";
    if (activeTab === "regionSearch") return "monthly";
    return activeTab;
  }

  function analyticsCacheKey(tab, period) {
    return [
      analyticsDataVersion,
      analyticsTabForView(tab),
      period?.startDate || "",
      period?.endDate || ""
    ].join("|");
  }

  function analyticsNeedsForTab(tab) {
    const analyticsTab = analyticsTabForView(tab);
    return {
      monthly: analyticsTab === "monthly",
      weekly: analyticsTab === "daily",
      campaignMonthly: analyticsTab === "campaign",
      campaigns: analyticsTab === "campaign",
      jobs: analyticsTab === "job",
      jobBreakdowns: analyticsTab === "job",
      salaryTypes: analyticsTab === "salary",
      salaryBuckets: analyticsTab === "job" || analyticsTab === "salary",
      area: analyticsTab === "salary"
    };
  }

  function filteredRowsForAnalytics(tab, period) {
    const analyticsTab = analyticsTabForView(tab);
    const daily = state.raw.daily.filter((row) => filterDaily(row, period));
    const job = state.raw.job.filter((row) => filterJob(row, period));
    const needsCampaign = analyticsTab === "campaign" || (!daily.length && !job.length);
    return {
      daily,
      campaign: needsCampaign ? state.raw.campaign.filter((row) => filterCampaign(row, period)) : [],
      job
    };
  }

  getAnalytics = function (tab = state.activeTab) {
    const analyticsTab = analyticsTabForView(tab);
    const hasData = state.raw.daily.length + state.raw.campaign.length + state.raw.job.length > 0;
    const period = periodForTab(analyticsTab);
    const cacheKey = analyticsCacheKey(analyticsTab, period);
    const cached = analyticsCache.get(cacheKey);
    if (cached) return cached;

    const filtered = filteredRowsForAnalytics(analyticsTab, period);
    const needs = analyticsNeedsForTab(analyticsTab);
    const hasDimensionFilter = false;
    const summaryRows = hasDimensionFilter && filtered.job.length ? filtered.job : filtered.daily.length ? filtered.daily : filtered.job.length ? filtered.job : filtered.campaign;
    const summary = summarize(summaryRows, filtered.job);
    const previous = getPreviousSummary(summaryRows);
    const yoy = getYoYSummary(summaryRows);
    const monthlyRows = hasDimensionFilter && filtered.job.length ? filtered.job : filtered.daily.length ? filtered.daily : filtered.job;
    const dailyRows = monthlyRows;

    const monthly = needs.monthly
      ? aggregateBy(monthlyRows, (row) => row.date.slice(0, 7), null, { keepRows: false }).sort((a, b) => a.name.localeCompare(b.name))
      : [];
    const weekly = needs.weekly
      ? aggregateBy(dailyRows, (row) => tenDayKey(row.date), null, { keepRows: false }).sort((a, b) => a.startDate.localeCompare(b.startDate))
      : [];
    const daily = [];
    const campaigns = needs.campaigns
      ? aggregateBy(filtered.job.length ? filtered.job : filtered.campaign, (row) => row.campaign, null, { keepRows: false }).sort((a, b) => b.cost - a.cost)
      : [];
    const campaignMonthlyRows = hasDimensionFilter ? filtered.job : filtered.campaign.length ? filtered.campaign : filtered.job;
    const campaignMonthly = needs.campaignMonthly
      ? aggregateBy(
        campaignMonthlyRows,
        (row) => `${row.date.slice(0, 7)}\u001f${row.campaign || "未分類"}`,
        enrichCampaignMonthlyGroup,
        { keepRows: false }
      ).sort((a, b) => a.month.localeCompare(b.month) || a.campaign.localeCompare(b.campaign, "ja"))
      : [];
    const jobs = needs.jobs
      ? aggregateBy(filtered.job, (row) => row.jobTitle, enrichJobGroup).sort((a, b) => b.applications - a.applications || b.cost - a.cost)
      : [];
    const jobTypes = needs.jobBreakdowns
      ? aggregateBy(filtered.job, (row) => row.jobType, null, { keepRows: false }).sort((a, b) => b.cost - a.cost)
      : [];
    const employments = needs.jobBreakdowns
      ? aggregateBy(filtered.job, (row) => row.employment, null, { keepRows: false }).sort((a, b) => b.cost - a.cost)
      : [];
    const salaryTypes = needs.salaryTypes
      ? aggregateBy(filtered.job, (row) => row.salaryType, enrichSalaryGroup).sort((a, b) => b.cost - a.cost)
      : [];
    const salaryBuckets = needs.salaryBuckets
      ? aggregateBy(filtered.job, salaryBucketLabel, null, { keepRows: false }).filter((item) => item.name !== "未分類").sort(sortBySalaryBucket)
      : [];
    const cities = needs.area
      ? aggregateBy(filtered.job, jobAreaAggregationName, null, { keepRows: false }).sort((a, b) => b.applications - a.applications || b.cost - a.cost)
      : [];
    const companies = needs.area
      ? aggregateBy(filtered.job, (row) => formatCompanyLocationName(row.company), null, { keepRows: false }).sort((a, b) => b.cost - a.cost)
      : [];

    const analytics = {
      hasData,
      filtered,
      summary,
      previous,
      yoy,
      monthly,
      weekly,
      daily,
      campaigns,
      campaignMonthly,
      jobs,
      jobTypes,
      employments,
      salaryTypes,
      salaryBuckets,
      cities,
      companies,
      insights: [],
      period: periodLabel(summaryRows)
    };
    analyticsCache.set(cacheKey, analytics);
    return analytics;
  };

  render = function () {
    fillFilterOptions();
    renderStatus();
    renderTabs();
    const activeTab = canonicalTab(state.activeTab);
    const activeAnalytics = getAnalytics(activeTab);
    renderKpis(activeAnalytics);
    renderActiveTab(activeTab, activeAnalytics);
    renderReportPreview(activeAnalytics);
    scheduleFloatingTableHeaderUpdate();
  };

  function renderActiveTab(activeTab, activeAnalytics) {
    if (activeTab === "monthly") return renderMonthly(activeAnalytics);
    if (activeTab === "daily") return renderDaily(activeAnalytics);
    if (activeTab === "campaign") return renderCampaign(activeAnalytics);
    if (activeTab === "job") return renderJob(activeAnalytics);
    if (activeTab === "salary") {
      renderSalary(activeAnalytics);
      renderArea(activeAnalytics);
      return;
    }
    if (activeTab === "regionSearch") return renderSidebarMarket();
    if (activeTab === "market") return renderJobMarket(getAnalytics("job"));
    if (activeTab === "target") return renderTargetAnalysis(getAnalytics("job"));
  }

  readFiles = async function (files) {
    if (!files.length) return;
    const nextRaw = { daily: [], campaign: [], job: [] };
    const names = [];
    showLoadingStatus("CSVを読み込んでいます", `${files.length}ファイルを準備しています`);
    await waitForPaint();

    try {
      for (const file of files) {
        showLoadingStatus("CSVを読み込んでいます", `${file.name} を処理しています`);
        await waitForPaint();
        const text = await readText(file);
        const parsed = parseCsv(text);
        const kind = detectKind(parsed.headers);
        if (kind) {
          nextRaw[kind].push(...normalizeRows(kind, parsed.rows));
          names.push(file.name);
        }
      }
    } catch (error) {
      console.error("CSV read failed", error);
      showLoadingStatus("CSV読込エラー", "CSVを読み込めませんでした。ファイル形式を確認してください。");
      return;
    }

    state.raw = nextRaw;
    state.fileNames = names;
    state.activeTab = "monthly";
    invalidateAnalyticsCache();
    applyInferredProfile({ force: true });
    resetFiltersFromData();
    resetTargetAnalysisRegion();
    hydrateInputs();
    render();
    saveState();
  };

  function showLoadingStatus(status, summary) {
    if (dom.loadStatus) {
      dom.loadStatus.textContent = status;
      dom.loadStatus.classList.remove("ready");
    }
    if (dom.fileSummary) dom.fileSummary.textContent = summary;
  }

  function waitForPaint() {
    return new Promise((resolve) => {
      const schedule = window.requestAnimationFrame || ((callback) => window.setTimeout(callback, 0));
      schedule(() => window.setTimeout(resolve, 0));
    });
  }

  renderDetailTable = function (container, rows, columns, tableClass) {
    if (!rows.length) {
      container.innerHTML = `<div class="empty-state">表示できるデータがありません</div>`;
      return;
    }
    const visibleRows = rows.slice(0, TABLE_ROW_LIMIT);
    const head = columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("");
    const body = visibleRows
      .map((row) => {
        const cells = columns
          .map((column) => {
            const className = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
            return `<td class="${className}">${escapeHtml(column.value(row))}</td>`;
          })
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");
    container.innerHTML = `${renderTableLimitNote(rows.length, visibleRows.length)}<table class="metric-detail-table ${tableClass}"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  };

  renderSortableTable = function (container, rows, columns, sortState, tableClass, sortScope = "job") {
    if (!rows.length) {
      container.innerHTML = `<div class="empty-state">表示できるデータがありません</div>`;
      return;
    }

    const sortedRows = sortTableRows(rows, columns, sortState);
    const visibleRows = sortedRows.slice(0, TABLE_ROW_LIMIT);
    const head = columns
      .map((column) => {
        const active = sortState?.key === column.sortKey;
        const arrow = active ? (sortState.direction === "asc" ? "▲" : "▼") : "↕";
        const ariaSort = active ? (sortState.direction === "asc" ? "ascending" : "descending") : "none";
        const className = [column.numeric ? "num" : "", column.sortKey ? "sortable-heading" : ""].filter(Boolean).join(" ");
        if (!column.sortKey) return `<th class="${className}" aria-sort="${ariaSort}">${escapeHtml(column.label)}</th>`;
        return `
          <th class="${className}" aria-sort="${ariaSort}">
            <button class="sort-button" type="button" data-sort-scope="${escapeHtml(sortScope)}" data-sort-key="${escapeHtml(column.sortKey)}" data-sort-type="${escapeHtml(column.sortType || "text")}" aria-label="${escapeHtml(column.label)}を昇順・降順で並び替え" title="${escapeHtml(column.label)}を昇順・降順で並び替え">
              <span>${escapeHtml(column.label)}</span>
              <small>${arrow}</small>
            </button>
          </th>
        `;
      })
      .join("");
    const body = visibleRows
      .map((row) => {
        const cells = columns
          .map((column) => {
            const className = [column.numeric ? "num" : "", column.className || ""].filter(Boolean).join(" ");
            return `<td class="${className}">${escapeHtml(column.value(row))}</td>`;
          })
          .join("");
        return `<tr>${cells}</tr>`;
      })
      .join("");
    container.innerHTML = `${renderTableLimitNote(rows.length, visibleRows.length)}<table class="metric-detail-table sortable-table ${tableClass}"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  };

  function renderTableLimitNote(total, shown) {
    if (total <= shown) return "";
    return `<div class="table-limit-note">表示は${formatNumber(shown)}件までに絞っています（全${formatNumber(total)}件）</div>`;
  }
})();
