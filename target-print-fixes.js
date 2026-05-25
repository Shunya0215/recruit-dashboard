(function () {
  function ensurePrintStyle() {
    if (document.getElementById("targetPrintFixStyle")) return;
    const style = document.createElement("style");
    style.id = "targetPrintFixStyle";
    style.textContent = `
      @media print {
        .target-report-page-actions[data-performance-split="1"] .target-report-actions-body {
          grid-template-rows: auto minmax(0, 1fr);
          align-content: start;
        }

        .target-report-performance-body {
          height: 100%;
          grid-template-rows: minmax(0, 1fr);
          gap: 8px;
        }

        .target-report-performance-body .target-prefecture-performance-card {
          display: grid;
          min-height: 0;
          height: 100%;
          grid-template-rows: auto minmax(0, 1fr);
          gap: 8px;
          padding: 12px;
        }

        .target-report-performance-body .target-prefecture-performance-card .panel-heading {
          margin-bottom: 0;
        }

        .target-report-performance-body .prefecture-breakdown-grid {
          min-height: 0;
          height: 100%;
          gap: 8px;
          align-items: stretch;
        }

        .target-report-performance-body .prefecture-breakdown-panel {
          display: grid;
          min-height: 0;
          grid-template-rows: auto minmax(0, 1fr);
          padding: 10px;
        }

        .target-report-performance-body .prefecture-breakdown-list,
        .target-report-performance-body .prefecture-breakdown-list.is-scrollable {
          min-height: 0;
          max-height: none;
          overflow: visible;
          align-content: start;
          gap: 6px;
          padding-right: 0;
        }

        .target-report-performance-body .prefecture-breakdown-row {
          gap: 4px 8px;
          padding: 6px 8px;
        }

        .target-report-performance-body .prefecture-breakdown-line {
          grid-template-columns: minmax(82px, 1fr) max-content;
        }

        .target-report-performance-body .prefecture-breakdown-row strong,
        .target-report-performance-body .prefecture-breakdown-row em,
        .target-report-performance-body .prefecture-breakdown-line span {
          font-size: 11px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function createReportHeader(title, subtitle) {
    const head = document.createElement("div");
    head.className = "report-section-head";
    const heading = document.createElement("h2");
    heading.className = "report-section-title";
    heading.textContent = title;
    const label = document.createElement("span");
    label.textContent = subtitle;
    head.append(heading, label);
    return head;
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

  function splitTargetPerformancePage() {
    ensurePrintStyle();
    const printReport = document.getElementById("printReport");
    const actionsPage = printReport?.querySelector(".target-report-page-actions");
    if (!actionsPage || actionsPage.dataset.performanceSplit === "1") return;

    const actionsBody = actionsPage.querySelector(".target-report-actions-body");
    const performanceCard = actionsBody?.querySelector(".target-prefecture-performance-card");
    if (!performanceCard) return;

    actionsPage.dataset.performanceSplit = "1";
    const actionsHead = actionsPage.querySelector(".report-section-head");
    setReportSubtitle(actionsHead, "賃金相場・改善案_候補");

    const performancePage = document.createElement("section");
    performancePage.className = "report-page target-report-page target-report-page-performance";
    const baseHead = actionsHead?.cloneNode(true) || createReportHeader("ターゲット分析(エリア)", "実績_内訳");
    setReportSubtitle(baseHead, "実績_内訳");

    const performanceBody = document.createElement("div");
    performanceBody.className = "target-report-body target-report-detail-body target-report-performance-body";
    performanceBody.appendChild(performanceCard);
    performancePage.append(baseHead, performanceBody);
    actionsPage.after(performancePage);
  }

  window.addEventListener("beforeprint", splitTargetPerformancePage);
})();
