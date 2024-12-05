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
let lastScrollTop = 0; // 最後にスクロールした位置
const navbar = document.querySelector("nav");
let isScrollEnabled = true; // スクロールが有効かどうかを示すフラグ
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
    if (link.textContent === "Top") {
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
// 「同意する」のチェックボックスを取得
const agreeCheckbox = document.getElementById("agree");
// 送信ボタンを取得
const submitBtn = document.getElementById("submit-btn");

// チェックボックスをクリックした時に送信ボタンの状態を切り替える
agreeCheckbox.addEventListener("change", () => {
  // チェックされている場合、送信ボタンを有効化
  if (agreeCheckbox.checked) {
    submitBtn.disabled = false; // disabledを外す
  } else {
    submitBtn.disabled = true; // disabledを付与
  }
});

// 初期状態でプライバシーポリシーの同意がチェックされていない場合、送信ボタンを無効にしておく
if (!agreeCheckbox.checked) {
  submitBtn.disabled = true; // 初期状態で送信ボタンを無効にする
}

// 画面スクロールしたときの処理（マウスが画面上部200px以内にいる場合）
window.addEventListener("scroll", function () {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;

  // もしスクロール位置が200px以下で、マウスが上部200px以内にいない場合、ナビゲーションバーを表示
  if (currentScroll <= 50) {
    navbar.style.top = "0"; // スクロールが上部200px以内に戻ったら表示
  }
});

// フォームの変更時に食事の選択肢を有効化/無効化する関数
function toggleMealOptions() {
  const plan = document.querySelector('input[name="plan"]:checked').value;
  const dinnerCheckbox = document.getElementById("dinner");
  const breakfastCheckbox = document.getElementById("breakfast");

  // 「素泊まり」が選ばれている場合、食事選択肢を無効にする
  if (plan === "no_meal") {
    dinnerCheckbox.disabled = true;
    breakfastCheckbox.disabled = true;
    dinnerCheckbox.checked = false;
    breakfastCheckbox.checked = false;
  } else {
    dinnerCheckbox.disabled = false;
    breakfastCheckbox.disabled = false;
  }
}

document
  .getElementById("reservationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // フォーム送信を防止

    // 各フィールドのエラーメッセージ用spanをリセット
    var errorSpans = document.querySelectorAll(".error-mark");
    errorSpans.forEach(function (span) {
      span.textContent = ""; // エラーメッセージをクリア
    });

    var errors = []; // エラーメッセージを格納する配列

    // 必須項目のバリデーション
    var name = document.getElementById("name").value;
    if (!name) {
      document.getElementById("nameError").textContent = "名前は必須です。";
      errors.push("名前は必須です。");
    }

    var postalCode = document.getElementById("postal_code").value;
    if (!postalCode) {
      document.getElementById("postalCodeError").textContent =
        "郵便番号は必須です。";
      errors.push("郵便番号は必須です。");
    } else if (!/^\d{3}-\d{4}$/.test(postalCode)) {
      document.getElementById("postalCodeError").textContent =
        "郵便番号は正しい形式で入力してください（例: 123-4567）。";
      errors.push("郵便番号は正しい形式で入力してください（例: 123-4567）。");
    }

    var prefecture = document.getElementById("prefecture").value;
    if (!prefecture) {
      document.getElementById("prefectureError").textContent =
        "都道府県は必須です。";
      errors.push("都道府県は必須です。");
    }

    var city = document.getElementById("city").value;
    if (!city) {
      document.getElementById("cityError").textContent = "市区町村は必須です。";
      errors.push("市区町村は必須です。");
    }

    var address = document.getElementById("address").value;
    if (!address) {
      document.getElementById("addressError").textContent =
        "番地・建物名は必須です。";
      errors.push("番地・建物名は必須です。");
    }

    var email = document.getElementById("email").value;
    if (!email) {
      document.getElementById("emailError").textContent =
        "メールアドレスは必須です。";
      errors.push("メールアドレスは必須です。");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      document.getElementById("emailError").textContent =
        "正しい形式でメールアドレスを入力してください。";
      errors.push("正しい形式でメールアドレスを入力してください。");
    }

    var phone = document.getElementById("phone").value;
    if (!phone) {
      document.getElementById("phoneError").textContent =
        "電話番号は必須です。";
      errors.push("電話番号は必須です。");
    } else if (!/^\d{3}-\d{4}-\d{4}$/.test(phone)) {
      document.getElementById("phoneError").textContent =
        "電話番号は正しい形式で入力してください（例: 090-1234-5678）。";
      errors.push(
        "電話番号は正しい形式で入力してください（例: 090-1234-5678）。"
      );
    }

    // チェックイン日時のバリデーション
    var checkin = document.getElementById("checkin").value;
    if (!checkin) {
      document.getElementById("checkinError").textContent =
        "チェックイン日時は必須です。";
      errors.push("チェックイン日時は必須です。");
    } else {
      var checkinDate = new Date(checkin);
      var checkinHour = checkinDate.getHours();

      // チェックインは15:00〜19:00の間
      if (checkinHour < 15 || checkinHour > 19) {
        document.getElementById("checkinError").textContent =
          "チェックインは15:00〜19:00です。";
        errors.push("チェックインは15:00〜19:00です。");
      }
    }

    // チェックアウト日時のバリデーション
    var checkout = document.getElementById("checkout").value;
    if (!checkout) {
      document.getElementById("checkoutError").textContent =
        "チェックアウト日時は必須です。";
      errors.push("チェックアウト日時は必須です。");
    } else {
      var checkinDate = new Date(document.getElementById("checkin").value);
      var checkoutDate = new Date(checkout);

      // チェックアウトはチェックイン後、翌日10:00まで
      if (
        checkoutDate.getTime() <= checkinDate.getTime() ||
        checkoutDate.getHours() > 10
      ) {
        document.getElementById("checkoutError").textContent =
          "チェックアウトは～10:00までです。";
        errors.push("チェックアウトは～10:00までです。");
      }
    }

    var adults = document.getElementById("adults").value;
    if (!adults) {
      document.getElementById("adultsError").textContent =
        "大人の人数は必須です。";
      errors.push("大人の人数は必須です。");
    }

    var children = document.getElementById("children").value;
    if (!children) {
      document.getElementById("childrenError").textContent =
        "子どもの人数は必須です。";
      errors.push("子どもの人数は必須です。");
    }

    var mealType = document.querySelector('input[name="meal_type"]:checked');
    if (!mealType) {
      document.getElementById("mealError").textContent =
        "食事タイプは必須です。";
      errors.push("食事タイプは必須です。");
    }

    // 食事付きプランの場合、食事内容が選択されているかを確認
    if (
      document.querySelector('input[name="plan"]:checked').value === "with_meal"
    ) {
      const mealCheckboxes = document.querySelectorAll(
        'input[name="meal[]"]:checked'
      );
      if (mealCheckboxes.length === 0) {
        document.getElementById("mealError").textContent =
          "食事内容（夕食または朝食）を選択してください。";
        errors.push("食事内容（夕食または朝食）を選択してください。");
      }
    }

    // エラーがない場合は送信
    if (errors.length === 0) {
      alert("フォームは正常に送信されました！");
      // ここでフォーム送信の処理を行います
      // document.getElementById("reservationForm").submit();
    }
  });

// 郵便番号を入力したときに住所情報を自動入力する関数
function fetchAddressFromPostalCode() {
  const postalCode = document.getElementById("postal_code").value;

  // 郵便番号が正しい形式（例: 123-4567）でない場合は処理を中止
  if (!/^\d{3}-\d{4}$/.test(postalCode)) return;

  const url = `https://api.zipaddress.net/?zipcode=${postalCode.replace(
    "-",
    ""
  )}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        // 住所データが正しく取得できた場合
        const addressData = data.data;
        document.getElementById("prefecture").value = addressData.pref;
        document.getElementById("city").value = addressData.city;
        document.getElementById("address").value = addressData.town;
      } else {
        alert("住所情報の取得に失敗しました。");
      }
    })
    .catch((error) => {
      console.error("住所の取得エラー:", error);
      alert("住所情報の取得に失敗しました。");
    });
}
