window.onload = function () {
  setTimeout(function () {
    const loadingLoadup = document.getElementById("loading");
    loadingLoadup.classList.add("loading-loadup");
    loadingLoadup.classList.add("loading-set");
    const steamDiv = document.querySelector("#steam");
    steamDiv.classList.remove("display-none");
  }, 4000); // 3秒後に実行
};

const loadingLoadup = document.getElementById("loading");
loadingLoadup.addEventListener("click", function () {
  const steamDiv = document.querySelector("#steam");
  loadingLoadup.classList.add("loading-loadup");
  steamDiv.classList.remove("display-none"); // ここで非表示を解除
});

// .steaml と .steamr がアニメーション終了後に display: none を設定するための処理
document.addEventListener("DOMContentLoaded", function () {
  const steam = document.querySelector("#steam");
  // アニメーションが終了したときに display: none を適用
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
    if (link.textContent === "Stay") {
      // 何もしない、ナビゲーションは表示のまま
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

window.addEventListener("scroll", function () {
  // 画面幅が1024px以上（PCサイズ）の場合のみ処理を実行
  if (window.innerWidth >= 1024) {
    // スクロール時の処理をまとめて実行
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
// ページが読み込まれた時にも実行する関数
function handleScroll() {
  // 画面幅が2048px以上（大きなディスプレイサイズ）の場合のみ処理を実行
  if (window.innerWidth >= 2048) {
    // スクロール時の処理をまとめて実行
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

// ページ読み込み時に実行
document.addEventListener("DOMContentLoaded", handleScroll);

// スクロール時にも実行
window.addEventListener("scroll", handleScroll);

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
