const search = document.getElementById("search");
const result = document.getElementById("result");
const wordInput = document.getElementById("word");
const meaningInput = document.getElementById("meaning");
const addBtn = document.getElementById("addBtn");

// データ読み込み
let dictionary = JSON.parse(localStorage.getItem("dictionary")) || [];

// 保存
function save() {
  localStorage.setItem("dictionary", JSON.stringify(dictionary));
}

// 表示更新（検索用）
function render(keyword) {
  result.innerHTML = "";

  if (!keyword) return;

  dictionary
    .filter(item =>
      item.word.toLowerCase().includes(keyword) ||
      item.meaning.toLowerCase().includes(keyword)
    )
    .forEach((item, index) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <div class="word">${item.word}</div>
        <div class="meaning">${item.meaning}</div>
        <button class="delete-btn">削除</button>
      `;

      // 削除処理
      li.querySelector(".delete-btn").addEventListener("click", () => {
        dictionary.splice(index, 1);
        save();
        render(search.value.trim().toLowerCase());
      });

      result.appendChild(li);
    });
}

// 検索
search.addEventListener("input", () => {
  const keyword = search.value.trim().toLowerCase();
  render(keyword);
});

// 追加
addBtn.addEventListener("click", () => {
  const word = wordInput.value.trim();
  const meaning = meaningInput.value.trim();

  if (!word || !meaning) return;

  dictionary.push({ word, meaning });
  save();

  wordInput.value = "";
  meaningInput.value = "";

  render(search.value.trim().toLowerCase());
});
