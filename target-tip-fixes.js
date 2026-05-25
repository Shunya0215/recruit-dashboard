(function () {
  const MIN_TIP_COUNT = 8;
  const FALLBACK_TIPS = [
    {
      title: "母集団を商談冒頭に置く",
      text: "対象エリアの母集団を先に示し、狭い場合は年齢、性別、近隣エリアの順に広げる提案にできます。"
    },
    {
      title: "勤務地・通勤情報の補強",
      text: "駅、バス停、駐車場、通勤時間など生活導線の情報を原稿上部へ寄せると、応募前の不安を減らせます。"
    },
    {
      title: "仕事内容の解像度を上げる",
      text: "未経験者にも初日からの流れ、作業量、チーム体制が伝わる粒度にすると、応募前の迷いを減らせます。"
    },
    {
      title: "募集条件の優先順位づけ",
      text: "給与、シフト、経験条件、勤務地、選考スピードに分けて提示し、必須条件と緩和できる条件を整理します。"
    },
    {
      title: "シフト時間帯の出し分け",
      text: "朝、昼、夕方、夜のどこが強い求人かを原稿冒頭で分けて見せると、候補者の自己選別を助けられます。"
    },
    {
      title: "選考スピードの明文化",
      text: "応募後の連絡目安、面接回数、勤務開始までの日数を短く書くと、他社比較中の候補者に選ばれやすくなります。"
    },
    {
      title: "近隣エリア拡張の比較",
      text: "対象エリア単体で応募が伸びにくい場合は、隣接市区町村や通勤しやすい生活圏を比較候補にできます。"
    },
    {
      title: "比較検証用の原稿パターン",
      text: "給与訴求型、時間訴求型、勤務地訴求型の3パターンで原稿を分けると、改善幅を検証しやすくなります。"
    }
  ];

  function createTipItem(tip, index) {
    const item = document.createElement("div");
    item.className = "target-tip-item";
    item.setAttribute("data-target-tip-item", "");

    const head = document.createElement("div");
    head.className = "target-tip-edit-head";

    const titleLabel = document.createElement("label");
    titleLabel.className = "target-tip-edit-label";
    const hiddenTitle = document.createElement("span");
    hiddenTitle.className = "visually-hidden";
    hiddenTitle.textContent = "改善案タイトル";
    const titleInput = document.createElement("input");
    titleInput.className = "target-tip-title-input";
    titleInput.type = "text";
    titleInput.value = tip.title;
    titleInput.placeholder = "改善案タイトル";
    titleInput.setAttribute("data-target-tip-title", "");
    titleLabel.append(hiddenTitle, titleInput);

    const deleteButton = document.createElement("button");
    deleteButton.className = "target-tip-delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "削除";
    deleteButton.setAttribute("data-target-tip-delete", String(index));
    head.append(titleLabel, deleteButton);

    const textLabel = document.createElement("label");
    textLabel.className = "target-tip-edit-label";
    const hiddenText = document.createElement("span");
    hiddenText.className = "visually-hidden";
    hiddenText.textContent = "改善案詳細";
    const textarea = document.createElement("textarea");
    textarea.className = "target-tip-text-input";
    textarea.rows = 3;
    textarea.placeholder = "詳細説明";
    textarea.value = tip.text;
    textarea.setAttribute("data-target-tip-text", "");
    textLabel.append(hiddenText, textarea);

    item.append(head, textLabel);
    requestAnimationFrame(() => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
    return item;
  }

  function ensureMinimumTips() {
    const list = document.querySelector("#targetAnalysisResult .target-tips-list[data-target-strategy-signature]");
    if (!list) return;
    const items = [...list.querySelectorAll("[data-target-tip-item]")];
    if (!items.length || items.length >= MIN_TIP_COUNT) return;

    const existingTitles = new Set(
      items
        .map((item) => item.querySelector("[data-target-tip-title]")?.value?.trim())
        .filter(Boolean)
    );
    const additions = FALLBACK_TIPS.filter((tip) => !existingTitles.has(tip.title)).slice(0, MIN_TIP_COUNT - items.length);
    additions.forEach((tip, offset) => {
      list.appendChild(createTipItem(tip, items.length + offset));
    });
  }

  const observer = new MutationObserver(() => ensureMinimumTips());
  document.addEventListener("DOMContentLoaded", () => {
    ensureMinimumTips();
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
