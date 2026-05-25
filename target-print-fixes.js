(function () {
  const MAX_PRINT_BREAKDOWN_ROWS = 5;

  function ensurePrintStyle() {
    if (document.getElementById("targetPrintFixStyle")) return;
    const style = document.createElement("style");
    style.id = "targetPrintFixStyle";
    style.textContent = `
      @media print {
        .target-report-page-actions[data-performance-compact="1"] .target-report-actions-body {
          grid-template-rows: auto auto minmax(0, 1fr);
          gap: 5px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-card,
        .target-report-page-actions[data-performance-compact="1"] .target-tips-card,
        .target-report-page-actions[data-performance-compact="1"] .target-prefecture-performance-card {
          padding: 8px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-card,
        .target-report-page-actions[data-performance-compact="1"] .target-tips-card {
          gap: 5px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-grid {
          gap: 5px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-item {
          gap: 2px;
          padding: 6px 7px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-item strong {
          font-size: 13px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-item span,
        .target-report-page-actions[data-performance-compact="1"] .target-tip-item strong {
          font-size: 9px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-item small,
        .target-report-page-actions[data-performance-compact="1"] .target-tip-item span,
        .target-report-page-actions[data-performance-compact="1"] .target-source-note {
          font-size: 7.5px;
          line-height: 1.22;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-tips-list {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 3px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-tip-item {
          gap: 2px;
          padding: 4px 6px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-tip-item span {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-section-heading h2,
        .target-report-page-actions[data-performance-compact="1"] .target-prefecture-performance-card .panel-heading h2 {
          font-size: 13px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-prefecture-performance-card {
          display: grid;
          min-height: 0;
          height: 100%;
          grid-template-rows: auto minmax(0, 1fr);
          gap: 4px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-prefecture-performance-card .panel-heading {
          margin-bottom: 0;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-grid {
          min-height: 0;
          height: 100%;
          gap: 5px;
          align-items: stretch;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-panel {
          display: grid;
          min-height: 0;
          grid-template-rows: auto minmax(0, 1fr);
          padding: 6px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-panel .panel-heading {
          margin-bottom: 4px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-panel .panel-heading h2 {
          font-size: 10.5px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-panel .panel-heading span {
          font-size: 7.5px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-list,
        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-list.is-scrollable {
          min-height: 0;
          max-height: none;
          overflow: visible;
          align-content: start;
          gap: 3px;
          padding-right: 0;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row {
          gap: 2px 5px;
          padding: 3px 5px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row i {
          height: 3px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-line {
          grid-template-columns: minmax(64px, 1fr) max-content;
          gap: 4px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row strong,
        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row em,
        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-line span {
          font-size: 8.5px;
          line-height: 1.2;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row small {
          margin-top: 1px;
          font-size: 7.5px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setReportSubtitle(head, subtitle) {
    if (!head) return;
    let label = head.querySelector("span");
    if (!label) {
      label = document.createElement("span");
      head.appendChild(label);
    }
    label.textContent = subtitle;
  }

  function movePerformanceBackToActions(printReport, actionsPage) {
    const performancePage = printReport?.querySelector(".target-report-page-performance");
    const performanceCard = performancePage?.querySelector(".target-prefecture-performance-card");
    const actionsBody = actionsPage?.querySelector(".target-report-actions-body");
    if (!performancePage || !performanceCard || !actionsBody) return;
    actionsBody.appendChild(performanceCard);
    performancePage.remove();
  }

  function limitBreakdownRows(performanceCard) {
    performanceCard.querySelectorAll(".prefecture-breakdown-panel").forEach((panel) => {
      const rows = [...panel.querySelectorAll(".prefecture-breakdown-row")];
      if (rows.length <= MAX_PRINT_BREAKDOWN_ROWS) return;
      rows.slice(MAX_PRINT_BREAKDOWN_ROWS).forEach((row) => row.remove());
      const subtitle = panel.querySelector(".panel-heading span");
      if (subtitle && !subtitle.textContent.includes("上位")) {
        subtitle.textContent = `${subtitle.textContent} / 上位${MAX_PRINT_BREAKDOWN_ROWS}件`;
      }
    });
  }

  function compactTargetActionPage() {
    ensurePrintStyle();
    const printReport = document.getElementById("printReport");
    const actionsPage = printReport?.querySelector(".target-report-page-actions");
    if (!actionsPage) return;

    movePerformanceBackToActions(printReport, actionsPage);

    const performanceCard = actionsPage.querySelector(".target-prefecture-performance-card");
    if (!performanceCard) return;

    actionsPage.dataset.performanceCompact = "1";
    setReportSubtitle(actionsPage.querySelector(".report-section-head"), "賃金相場・改善案_候補・実績_内訳");
    limitBreakdownRows(performanceCard);
  }

  window.addEventListener("beforeprint", compactTargetActionPage);
})();
