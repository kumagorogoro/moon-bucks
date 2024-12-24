const hamburger = document.querySelector("#menubtn");
const menubeans = document.querySelector(".menubeans");
const menu = document.querySelector("#spmenu");
const closeBtn = document.getElementById("close");
const menutext = document.querySelector("#menutext");
const links = document.querySelectorAll("#spmenu li a");

// ハンバーガーメニューアイコン（menubeans）クリック時にもメニューを表示
menubeans.addEventListener("click", function () {
  menu.classList.add("show"); // メニューに 'show' クラスを追加して表示
});

// ハンバーガーメニューを開くボタン（menubtn）クリック時にもメニューを表示
hamburger.addEventListener("click", function () {
  menu.classList.add("show"); // メニューに 'show' クラスを追加して表示
});

// 閉じるボタンをクリックしたとき
closeBtn.addEventListener("click", function () {
  menu.classList.remove("show"); // メニューから 'show' クラスを削除して非表示
});

// メニュー外をクリックした場合にメニューを閉じる
window.addEventListener("click", function (e) {
  if (
    !menu.contains(e.target) &&
    e.target !== hamburger &&
    e.target !== menutext &&
    e.target !== menubeans // menubeansも除外
  ) {
    menu.classList.remove("show"); // メニューから 'show' クラスを削除して非表示
  }
});

// メニューリンクをクリックしたときにメニューを閉じる
links.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("show"); // メニューから 'show' クラスを削除して非表示
  });
});
let index = 0;
const images = document.querySelectorAll(".slide-container img");

// スライドショーを制御する関数
function change() {
  // 現在の画像から 'active' クラスを削除してフェードアウト
  images[index].classList.remove("active");

  // 次の画像のインデックスを計算
  index = (index + 1) % images.length;

  // 新しい画像に 'active' クラスを追加してフェードイン
  images[index].classList.add("active");
}

// 初期ロード時に画像の差し替えを実行
adjustImagesBasedOnWidth();

// リサイズ時に画像の差し替えを実行
window.addEventListener("resize", adjustImagesBasedOnWidth);

// 5秒ごとに画像を切り替え
setInterval(change, 5000);

// 画面幅に基づいて画像を変更する関数
function adjustImagesBasedOnWidth() {
  const cafeImg = images[0]; // 1番目の画像（cafe.jpg）

  if (window.innerWidth <= 767) {
    // 767px以下の場合、1番目の画像をcafe2.jpgに変更
    cafeImg.src = "img/cafe2.jpg";
  } else {
    // 767px以上の場合、元のcafe.jpgに戻す
    cafeImg.src = "img/cafe.jpg";
  }
}

// moreボタンクリック時の動作
const btn = document.querySelector(".more-btn");
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

let lastScrollTop = 0; // 最後にスクロールした位置
const navbar = document.querySelector("nav");
let isScrollEnabled = true; // スクロールが有効かどうかを示すフラグ

// スクロールイベント
window.addEventListener("scroll", function () {
  if (!isScrollEnabled) return; // スクロールが無効な時は処理をスキップ

  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // 下にスクロールした場合は非表示
  if (currentScroll > lastScrollTop) {
    navbar.style.top = "-150px"; // ナビゲーションを隠す（高さ分調整）
  } else {
    // 上にスクロールした場合は表示
    navbar.style.top = "0";
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // スクロール位置が0以下にならないように
});

// <li>クリック時にナビゲーションを非表示にする
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    // "Top"リンクがクリックされた場合はナビゲーションを表示したまま
    if (link.textContent === "Cafe") {
      // 何もしない、ナビゲーションは表示のまま
      return;
    } else if (link.textContent === "Stay") {
      return;
    }
    // "Top"以外のリンクがクリックされた場合はナビゲーションを非表示にする
    isScrollEnabled = false;

    // Promise.resolve() で非同期に最優先で実行
    Promise.resolve().then(() => {
      // ナビゲーションを非表示にする
      navbar.style.top = "-150px"; // ナビゲーションを非表示にする

      // 少し待ってからスクロールイベントを再度有効化
      setTimeout(() => {
        isScrollEnabled = true; // スクロールを再度有効にする
      }, 100); // 100ミリ秒後にスクロールを再有効化
    });
  });
});

// マウスカーソルの位置を監視して、上部200px以内ならナビゲーションを表示
window.addEventListener("mousemove", function (event) {
  const mouseY = event.clientY;

  if (mouseY < 50) {
    navbar.style.top = "0"; // 上部200px以内に入ったらナビゲーションを表示
  }
});

// 画面スクロールしたときの処理（マウスが画面上部200px以内にいる場合）
window.addEventListener("scroll", function () {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  // もしスクロール位置が200px以下で、マウスが上部200px以内にいない場合、ナビゲーションバーを表示
  if (currentScroll <= 50) {
    navbar.style.top = "0"; // スクロールが上部200px以内に戻ったら表示
  }
});

// flipbook
let currentFrame = 0;
const frames = document.querySelectorAll(".flipbook .frame");
const totalFrames = frames.length;

function showNextFrame() {
  // 現在のフレームを非表示
  frames[currentFrame].style.display = "none";

  // 次のフレームを表示
  currentFrame = (currentFrame + 1) % totalFrames;
  frames[currentFrame].style.display = "block";
}

// 100msごとに次のフレームを表示
setInterval(showNextFrame, 150); // フレームを100msごとに切り替え

// ヘッダー情報
const header = document.querySelector(".fixed-header");
const headerHeight = header ? header.offsetHeight + 20 : 0;

// イージング関数（easeOutExpo）
function scrollToPos(position) {
  const startPos = window.scrollY;
  const distance = Math.min(
    position - startPos,
    document.documentElement.scrollHeight - window.innerHeight - startPos
  );
  const duration = 800; // スクロールにかかる時間（ミリ秒）

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

// 画像の強制読み込み
function loadImages() {
  const targets = document.querySelectorAll("[data-src]");
  for (const target of targets) {
    const dataSrc = target.getAttribute("data-src");
    const currentSrc = target.getAttribute("src");

    // data-src と src が異なる場合のみコピーする
    if (dataSrc !== currentSrc) {
      target.setAttribute("src", dataSrc);
    }
  }
}

// ページ内のスムーススクロール
for (const link of document.querySelectorAll('a[href*="#"]')) {
  link.addEventListener("click", (e) => {
    const hash = e.currentTarget.hash;
    const target = document.getElementById(hash.slice(1));

    // ページトップへ("#"と"#top"）
    if (!hash || hash === "#top") {
      e.preventDefault();
      scrollToPos(0);

      // アンカーへ
    } else if (target) {
      e.preventDefault();
      loadImages();
      const position =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;
      scrollToPos(position);

      // URLにハッシュを含める
      history.pushState(null, "", hash);
    }
  });
}

// 別ページ遷移後のスムーススクロール
const urlHash = window.location.hash;
if (urlHash) {
  const target = document.getElementById(urlHash.slice(1));
  if (target) {
    // ページトップから開始（ブラウザ差異を考慮して併用）
    history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);

    loadImages();
    window.addEventListener("load", () => {
      const position =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;
      scrollToPos(position);

      // ハッシュを再設定
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
