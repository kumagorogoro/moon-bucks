const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");
const closeBtn = document.getElementById("close");
const bar1 = document.querySelector("#bar1");
const bar2 = document.querySelector("#bar2");
const bar3 = document.querySelector("#bar3");
const bar4 = document.querySelector("#bar4");

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
    e.target !== bar1 &&
    e.target !== bar2 &&
    e.target !== bar3 &&
    e.target !== bar4
  )
    menu.style.display = "none";
});
