// ハンバーガーメニュー
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
let lastScrollTop = 0;
const navbar = document.querySelector("nav");
let isScrollEnabled = true;
window.addEventListener("scroll", function () {
  if (!isScrollEnabled) return;
  let currentScroll = window.scrollY || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    navbar.style.top = "-150px";
  } else {
    navbar.style.top = "0";
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// pc-nav
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    if (link.textContent === "Stay") {
      return;
    } else if (link.textContent === "Cafe") {
      return;
    }
    isScrollEnabled = false;
    Promise.resolve().then(() => {
      navbar.style.top = "-150px";
      setTimeout(() => {
        isScrollEnabled = true;
      }, 100);
    });
  });
});
window.addEventListener("mousemove", function (event) {
  const mouseY = event.clientY;
  if (mouseY < 50) {
    navbar.style.top = "0";
  }
});

// ローディング画面
window.onload = function () {
  setTimeout(function () {
    const loadingLoadup = document.getElementById("loading");
    loadingLoadup.classList.add("loading-loadup");
    const steamDiv = document.querySelector("#steam");
    steamDiv.classList.remove("display-none");
  }, 4000);
};
const loadingLoadup = document.getElementById("loading");
loadingLoadup.addEventListener("click", function () {
  const steamDiv = document.querySelector("#steam");
  loadingLoadup.classList.add("loading-loadup");
  steamDiv.classList.remove("display-none");
});
document.addEventListener("DOMContentLoaded", function () {
  const steam = document.querySelector("#steam");
  steam.addEventListener("animationend", function () {
    steam.style.display = "none";
  });
});

// room-foodcontainer-visible
window.addEventListener("scroll", function () {
  if (window.innerWidth >= 1024) {
    const elements = [
      { id: "room", elementClass: "visible" },
      { id: "food-container", elementClass: "visible" },
    ];
    elements.forEach(function ({ id, elementClass }) {
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight) {
          element.classList.add(elementClass);
        } else {
          element.classList.remove(elementClass);
        }
      }
    });
  }
});


