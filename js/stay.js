window.onload = function () {
  setTimeout(function () {
    const loadingLoadup = document.getElementById("loading");
    loadingLoadup.classList.add("loading-loadup");
    loadingLoadup.classList.add("loading-set");
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
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    navbar.style.top = "-150px"; 
    } else {
    navbar.style.top = "0";
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
});


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
function handleScroll() {
  if (window.innerWidth >= 2048) {
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
}
document.addEventListener("DOMContentLoaded", handleScroll);
window.addEventListener("scroll", handleScroll);

const header = document.querySelector(".fixed-header");
const headerHeight = header ? header.offsetHeight + 20 : 0;
function scrollToPos(position) {
  const startPos = window.scrollY;
  const distance = Math.min(
    position - startPos,
    document.documentElement.scrollHeight - window.innerHeight - startPos
  );
  const duration = 800; 
  let startTime;
  function easeOutExpo(t, b, c, d) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
  }
  function animation(currentTime) {
    if (startTime === undefined) {
      startTime = currentTime;
    }
    const timeElapsed = currentTime - startTime;
    const scrollPos = easeOutExpo(timeElapsed, startPos, distance, duration);
    window.scrollTo(0, scrollPos);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, position);
    }
  }
  requestAnimationFrame(animation);
}

function loadImages() {
  const targets = document.querySelectorAll("[data-src]");
  for (const target of targets) {
    const dataSrc = target.getAttribute("data-src");
    const currentSrc = target.getAttribute("src");
    if (dataSrc !== currentSrc) {
      target.setAttribute("src", dataSrc);
    }
  }
}
for (const link of document.querySelectorAll('a[href*="#"]')) {
  link.addEventListener("click", (e) => {
    const hash = e.currentTarget.hash;
    const target = document.getElementById(hash.slice(1));
    if (!hash || hash === "#top") {
      e.preventDefault();
      scrollToPos(0);
    } else if (target) {
      e.preventDefault();
      loadImages();
      const position =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;
      scrollToPos(position);
      history.pushState(null, "", hash);
    }
  });
}

const urlHash = window.location.hash;
if (urlHash) {
  const target = document.getElementById(urlHash.slice(1));
  if (target) {
    history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
    loadImages();
    window.addEventListener("load", () => {
      const position =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;
      scrollToPos(position);
      history.replaceState(null, "", window.location.pathname + urlHash);
    });
  }
}
