// メニュー
const hamburger = document.querySelector("#menubtn");
const menubeans = document.querySelector(".menubeans");
const menu = document.querySelector("#menu");
const closeBtn = document.getElementById("close");
const menutext = document.querySelector("#menutext");
const links = document.querySelectorAll("#menu li a");

// ハンバーガーメニューアイコン（menubeans）クリック時にもメニューを表示
menubeans.addEventListener("click", function () {
  menu.style.display = "flex";
});

// ハンバーガーメニューを開くボタン（menubtn）クリック時にもメニューを表示
hamburger.addEventListener("click", function () {
  menu.style.display = "flex";
});

// 閉じるボタンをクリックしたとき
closeBtn.addEventListener("click", function () {
  menu.style.display = "none"; // ハンバーガーメニュー非表示
});

// メニュー外をクリックした場合にメニューを閉じる
window.addEventListener("click", function (e) {
  if (
    !menu.contains(e.target) &&
    e.target !== hamburger &&
    e.target !== menutext &&
    e.target !== menubeans // menubeansも除外
  ) {
    menu.style.display = "none";
  }
});

// メニューリンクをクリックしたときにメニューを閉じる
links.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.style.display = "none";
  });
});
// スライドショー
let index = 0;
const images = document.querySelectorAll(".main img");

function change() {
  images[index].classList.remove("active");
  index = (index + 1) % images.length;
  images[index].classList.add("active");
}
setInterval(change, 5000);

// moreボタンクリック時の動作
const btn = document.querySelector(".btn");
const border = document.querySelector(".info-new");
const infoHidden = document.querySelector(".info-old");

btn.addEventListener("click", function () {
  if (infoHidden.style.display === "none" || infoHidden.style.display === "") {
    infoHidden.style.display = "block"; // 表示
    border.style.borderBottom = "none";
    btn.textContent = "close"; // ボタンのテキストを「close」に変更
  } else {
    infoHidden.style.display = "none"; // 非表示
    btn.textContent = "more"; // ボタンのテキストを「more」に変更
    border.style.border = "solid 1px white";
  }
});
let lastScrollTop = 0; // 最後にスクロールした位置
const navbar = document.querySelector("nav");

window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScrollTop) {
    // 下にスクロールした場合（隠す）
    navbar.style.top = "-110px"; // ナビゲーションを上に隠す（高さ分調整）
  } else {
    // 上にスクロールした場合（表示）
    navbar.style.top = "0";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // スクロール位置が0以下にならないように
});
