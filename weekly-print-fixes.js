(function () {
  function ensureWeeklyPrintStyle() {
    if (document.getElementById("weeklyPrintFixStyle")) return;
    const style = document.createElement("style");
    style.id = "weeklyPrintFixStyle";
    style.textContent = `
      @media print {
        .report-weekly-table .ts-week-date-col {
          width: 7.4% !important;
          min-width: 18mm;
        }

        .report-weekly-table .ts-week-period-col {
          width: 14.8% !important;
          min-width: 36mm;
        }

        .report-weekly-table td.ts-week-date-col {
          overflow: visible !important;
          padding-left: 2px !important;
          padding-right: 2px !important;
          text-overflow: clip !important;
          white-space: nowrap !important;
          font-size: clamp(9.2px, var(--report-table-font, 10.8px), 10.4px);
          letter-spacing: -0.5px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureWeeklyPrintStyle, { once: true });
  } else {
    ensureWeeklyPrintStyle();
  }

  window.addEventListener("beforeprint", ensureWeeklyPrintStyle);
})();