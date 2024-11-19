// メニュー
const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");
const closeBtn = document.getElementById("close");
// const bar1 = document.querySelector("#bar1");
// const bar2 = document.querySelector("#bar2");
// const bar3 = document.querySelector("#bar3");
const bar4 = document.querySelector("#bar4");
const links = document.querySelectorAll("#menu ul li a");

hamburger.addEventListener("click", function (e) {
  console.log(e);
  menu.style.display = "flex";
});
// 閉じるボタンをクリックしたとき
closeBtn.addEventListener("click", function () {
  menu.style.display = "none"; // ハンバーガーメニュー非表示
});

window.addEventListener("click", function (e) {
  if (
    !menu.contains(e.target) &&
    e.target !== hamburger &&
    // e.target !== bar1 &&
    // e.target !== bar2 &&
    // e.target !== bar3 &&
    e.target !== bar4
  )
    menu.style.display = "none";
});

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
