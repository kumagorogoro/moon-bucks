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
