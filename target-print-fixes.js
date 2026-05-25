(function () {
  const MAX_PRINT_BREAKDOWN_ROWS = 5;

  function ensurePrintStyle() {
    if (document.getElementById("targetPrintFixStyle")) return;
    const style = document.createElement("style");
    style.id = "targetPrintFixStyle";
    style.textContent = `
      @media print {
        .target-report-page-actions[data-performance-compact="1"] .report-section-head {
          margin-bottom: 9px;
          padding-bottom: 8px;
        }

        .target-report-page-actions[data-performance-compact="1"] .report-section-title {
          font-size: 21px;
        }

        .target-report-page-actions[data-performance-compact="1"] .report-section-head span {
          font-size: 12px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-report-actions-body {
          height: auto;
          grid-template-rows: auto auto auto;
          align-content: start;
          gap: 8px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-card,
        .target-report-page-actions[data-performance-compact="1"] .target-tips-card,
        .target-report-page-actions[data-performance-compact="1"] .target-prefecture-performance-card {
          padding: 11px 12px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-card,
        .target-report-page-actions[data-performance-compact="1"] .target-tips-card {
          gap: 8px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-grid {
          gap: 8px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-item {
          gap: 5px;
          min-height: 19mm;
          padding: 9px 10px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-item strong {
          font-size: 18px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-item span,
        .target-report-page-actions[data-performance-compact="1"] .target-tip-item strong {
          font-size: 12px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-wage-item small,
        .target-report-page-actions[data-performance-compact="1"] .target-tip-item span,
        .target-report-page-actions[data-performance-compact="1"] .target-source-note {
          font-size: 10px;
          line-height: 1.35;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-tips-list {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 6px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-tip-item {
          gap: 4px;
          min-height: 13mm;
          padding: 7px 10px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-tip-item span {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-section-heading h2,
        .target-report-page-actions[data-performance-compact="1"] .target-prefecture-performance-card .panel-heading h2 {
          font-size: 17px;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-prefecture-performance-card {
          display: grid;
          min-height: 0;
          height: auto;
          max-height: 80mm;
          grid-template-rows: auto auto;
          gap: 8px;
          overflow: hidden;
        }

        .target-report-page-actions[data-performance-compact="1"] .target-prefecture-performance-card .panel-heading {
          margin-bottom: 0;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-grid {
          min-height: 0;
          height: auto;
          gap: 9px;
          align-items: start;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-panel {
          display: grid;
          min-height: 0;
          height: auto;
          grid-template-rows: auto auto;
          padding: 9px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-panel .panel-heading {
          margin-bottom: 6px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-panel .panel-heading h2 {
          font-size: 13px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-panel .panel-heading span {
          font-size: 10px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-list,
        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-list.is-scrollable {
          min-height: 0;
          max-height: none;
          overflow: visible;
          align-content: start;
          gap: 5px;
          padding-right: 0;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row {
          gap: 4px 8px;
          padding: 6px 8px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row i {
          height: 4px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-line {
          grid-template-columns: minmax(82px, 1fr) max-content;
          gap: 5px 8px;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row strong,
        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row em,
        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-line span {
          font-size: 11px;
          line-height: 1.25;
        }

        .target-report-page-actions[data-performance-compact="1"] .prefecture-breakdown-row small {
          margin-top: 2px;
          font-size: 9.5px;
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