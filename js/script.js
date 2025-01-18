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

// スライドショー
let index = 0;
const images = document.querySelectorAll(".slide-container img");

function change() {
  images[index].classList.remove("active");
  index = (index + 1) % images.length;
  images[index].classList.add("active");
}
adjustImagesBasedOnWidth();
window.addEventListener("resize", adjustImagesBasedOnWidth);
function adjustImagesBasedOnWidth() {
  const cafeImg = images[0];
  if (window.innerWidth <= 767) {
    cafeImg.src = "img/cafe2.jpg";
  } else {
    cafeImg.src = "img/cafe.jpg";
  }
}

// info-btn
const btn = document.querySelector(".more-btn");
const border = document.querySelector(".info-new");
const infoHidden = document.querySelector(".info-old");
btn.addEventListener("click", function () {
  if (infoHidden.style.display === "none" || infoHidden.style.display === "") {
    infoHidden.style.display = "block";
    border.style.borderBottom = "none";
    btn.textContent = "close";
  } else {
    infoHidden.style.display = "none";
    btn.textContent = "more";
    border.style.border = "solid 1px white";
  }
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
window.addEventListener("scroll", function () {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;
  if (currentScroll <= 50) {
    navbar.style.top = "0";
  }
});

// アニメーション
let currentFrame = 0;
const frames = document.querySelectorAll(".flipbook .frame");
const totalFrames = frames.length;
function showNextFrame() {
  frames[currentFrame].style.display = "none";
  currentFrame = (currentFrame + 1) % totalFrames;
  frames[currentFrame].style.display = "block";
}
setInterval(showNextFrame, 150);
