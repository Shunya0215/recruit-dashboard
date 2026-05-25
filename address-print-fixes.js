(function () {
  const OLD_BULK_TITLE = "住所一括検索";
  const NEW_BULK_TITLE = "住所調査";

  function renameAddressBulkPrintTitles() {
    const printReport = document.getElementById("printReport");
    if (!printReport) return;
    printReport.querySelectorAll(".address-bulk-report-page .report-section-title").forEach((title) => {
      if (title.textContent.trim() === OLD_BULK_TITLE) {
        title.textContent = NEW_BULK_TITLE;
      }
    });
  }

  function observePrintReport() {
    const printReport = document.getElementById("printReport");
    if (!printReport || printReport.dataset.addressPrintFixObserved === "1") return;
    printReport.dataset.addressPrintFixObserved = "1";
    new MutationObserver(renameAddressBulkPrintTitles).observe(printReport, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observePrintReport, { once: true });
  } else {
    observePrintReport();
  }

  window.addEventListener("beforeprint", renameAddressBulkPrintTitles);
})();