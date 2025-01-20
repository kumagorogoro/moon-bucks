// ハンバーガー
const hamburger = document.querySelector("#menubtn");
const menubeans = document.querySelector(".menubeans");
const menu = document.querySelector("#spmenu");
const closeBtn = document.getElementById("close");
const menutext = document.querySelector("#menutext");
const links = document.querySelectorAll("#spmenu li a");

menubeans.addEventListener("click", function () {
  menu.classList.add("show");
});

hamburger.addEventListener("click", function () {
  menu.classList.add("show");
});

closeBtn.addEventListener("click", function () {
  menu.classList.remove("show");
});

window.addEventListener("click", function (e) {
  if (
    !menu.contains(e.target) &&
    e.target !== hamburger &&
    e.target !== menutext &&
    e.target !== menubeans
  ) {
    menu.classList.remove("show");
  }
});

links.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("show");
  });
});

// pc-nav
let lastScrollTop = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", function () {
  let currentScroll = window.scrollY || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    navbar.style.top = "-150px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    if (link.textContent === "Cafe") {
      return;
    } else if (link.textContent === "Stay") {
      return;
    } else {
      navbar.style.top = "-150px";
    }
  });
});

window.addEventListener("mousemove", function (event) {
  const mouseY = event.clientY;
  if (mouseY < 50) {
    navbar.style.top = "0";
  }
});
