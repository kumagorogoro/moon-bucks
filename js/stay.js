// ローディング画面
window.addEventListener("load", function () {
  setTimeout(function () {
    const loadingLoadup = document.getElementById("loading");
    loadingLoadup.classList.add("loading-loadup");
    const steamDiv = document.querySelector("#steam");
    steamDiv.classList.remove("display-none");
  }, 4000);
});
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
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementPosition < windowHeight) {
        element.classList.add(elementClass);
      } else {
        element.classList.remove(elementClass);
      }
    });
  }
});
