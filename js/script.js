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
let index = 0;
const images = document.querySelectorAll(".slide-container img");

function change() {
  images[index].classList.remove("active");
  index = (index + 1) % images.length;
  images[index].classList.add("active");
}
adjustImagesBasedOnWidth();
window.addEventListener("resize", adjustImagesBasedOnWidth);
setInterval(change, 5000);
function adjustImagesBasedOnWidth() {
  const cafeImg = images[0];
  if (window.innerWidth <= 767) {
    cafeImg.src = "img/cafe2.jpg";
  } else {
    cafeImg.src = "img/cafe.jpg";
  }
}

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
    if (link.textContent === "Cafe") {
      return;
    } else if (link.textContent === "Stay") {
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
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll <= 50) {
    navbar.style.top = "0";
  }
});

let currentFrame = 0;
const frames = document.querySelectorAll(".flipbook .frame");
const totalFrames = frames.length;
function showNextFrame() {
  frames[currentFrame].style.display = "none";
  currentFrame = (currentFrame + 1) % totalFrames;
  frames[currentFrame].style.display = "block";
}

setInterval(showNextFrame, 150); 
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
(function (d) {
  var config = {
      kitId: "xeg1hdh",
      scriptTimeout: 3000,
      async: true,
    },
    h = d.documentElement,
    t = setTimeout(function () {
      h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive";
    }, config.scriptTimeout),
    tk = d.createElement("script"),
    f = false,
    s = d.getElementsByTagName("script")[0],
    a;
  h.className += " wf-loading";
  tk.src = "https://use.typekit.net/" + config.kitId + ".js";
  tk.async = true;
  tk.onload = tk.onreadystatechange = function () {
    a = this.readyState;
    if (f || (a && a != "complete" && a != "loaded")) return;
    f = true;
    clearTimeout(t);
    try {
      Typekit.load(config);
    } catch (e) {}
  };
  s.parentNode.insertBefore(tk, s);
})(document);
