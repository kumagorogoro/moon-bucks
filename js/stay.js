const hamburger = document.querySelector("#menubtn");
const menubeans = document.querySelector(".menubeans");
const menu = document.querySelector("#menu");
const closeBtn = document.getElementById("close");
const menutext = document.querySelector("#menutext");
const links = document.querySelectorAll("#menu li a");

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
// スクロールイベント
window.addEventListener("scroll", function () {
  if (!isScrollEnabled) return; // スクロールが無効な時は処理をスキップ

  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // 下にスクロールした場合は非表示
  if (currentScroll > lastScrollTop) {
    navbar.style.top = "-140px"; // ナビゲーションを隠す（高さ分調整）
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
    if (link.textContent === "ご宿泊") {
      // 何もしない、ナビゲーションは表示のまま
      return;
    }

    // "Top"以外のリンクがクリックされた場合はナビゲーションを非表示にする
    isScrollEnabled = false;

    // Promise.resolve() で非同期に最優先で実行
    Promise.resolve().then(() => {
      // ナビゲーションを非表示にする
      navbar.style.top = "-140px"; // ナビゲーションを非表示にする

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