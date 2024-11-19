// メニュー
const hamburger = document.querySelector("#menubtn");
const menu = document.querySelector("#menu");
const closeBtn = document.getElementById("close");
const menutext = document.querySelector("#menutext");
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
    e.target !== menutext
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
