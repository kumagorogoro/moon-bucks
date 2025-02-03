// form
window.addEventListener("load", function () {
  toggleMealOptions();
});

const agreeCheckbox = document.getElementById("agree");
const submitBtn = document.getElementById("submit-btn");
agreeCheckbox.addEventListener("change", function () {
  if (agreeCheckbox.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});

const reservationForm = document.getElementById("reservationForm");
reservationForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const errorSpans = document.querySelectorAll(".error-mark");
  errorSpans.forEach(function (span) {
    span.textContent = "";
  });
  const errors = [];

  const name = document.getElementById("name").value;
  if (!name) {
    document.getElementById("nameError").textContent = "名前は必須です。";
    errors.push("名前は必須です。");
  }

  const postalCode = document.getElementById("postal_code").value;
  if (!postalCode) {
    document.getElementById("postalCodeError").textContent =
      "郵便番号は必須です。";
    errors.push("郵便番号は必須です。");
  } else if (!/^\d{3}-\d{4}$/.test(postalCode)) {
    document.getElementById("postalCodeError").textContent =
      "郵便番号は正しい形式で入力してください（例: 123-4567）。";
    errors.push("郵便番号は正しい形式で入力してください（例: 123-4567）。");
  }

  const prefecture = document.getElementById("prefecture").value;
  if (!prefecture) {
    document.getElementById("prefectureError").textContent =
      "都道府県は必須です。";
    errors.push("都道府県は必須です。");
  }

  const city = document.getElementById("city").value;
  if (!city) {
    document.getElementById("cityError").textContent = "市区町村は必須です。";
    errors.push("市区町村は必須です。");
  }

  const address = document.getElementById("address").value;
  if (!address) {
    document.getElementById("addressError").textContent =
      "番地・建物名は必須です。";
    errors.push("番地・建物名は必須です。");
  }

  const email = document.getElementById("email").value;
  if (!email) {
    document.getElementById("emailError").textContent =
      "メールアドレスは必須です。";
    errors.push("メールアドレスは必須です。");
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    document.getElementById("emailError").textContent =
      "正しい形式でメールアドレスを入力してください。";
    errors.push("正しい形式でメールアドレスを入力してください。");
  }

  const phone = document.getElementById("phone").value;
  if (!phone) {
    document.getElementById("phoneError").textContent = "電話番号は必須です。";
    errors.push("電話番号は必須です。");
  }

  const dinnerCheckbox = document.getElementById("dinner").checked;
  const breakfastCheckbox = document.getElementById("breakfast").checked;
  const noMeal = document.querySelector("input[value='no_meal']");
  if (
    noMeal.checked === true &&
    (dinnerCheckbox === true || breakfastCheckbox === true)
  ) {
    document.getElementById("nomealError").textContent =
      "素泊まりは食事の選択ができません。";
    errors.push("素泊まりは食事の選択ができません。");
  }

  const withMeal = document.querySelector("input[value='with_meal']");
  if (
    withMeal.checked === true &&
    dinnerCheckbox === false &&
    breakfastCheckbox === false
  ) {
    document.getElementById("withmealError").textContent =
      "お食事を選択してください。";
    errors.push("お食事を選択してください。");
  }

  const checkin = document.getElementById("checkin").value;
  if (!checkin) {
    document.getElementById("checkinError").textContent =
      "チェックイン日時は必須です。";
    errors.push("チェックイン日時は必須です。");
  } else {
    const checkinDate = new Date(checkin);
    const checkinHour = checkinDate.getHours();
    if (checkinHour < 15 || checkinHour > 19) {
      document.getElementById("checkinError").textContent =
        "チェックインは15:00〜19:00です。";
      errors.push("チェックインは15:00〜19:00です。");
    }
  }
  const checkout = document.getElementById("checkout").value;
  if (!checkout) {
    document.getElementById("checkoutError").textContent =
      "チェックアウト日時は必須です。";
    errors.push("チェックアウト日時は必須です。");
  } else {
    const checkinDate = new Date(document.getElementById("checkin").value);
    const checkoutDate = new Date(checkout);
    if (checkoutDate.getTime() <= checkinDate.getTime()) {
      document.getElementById("checkoutError").textContent =
        "チェックアウト日時はチェックイン日時以降をご指定ください。";
      errors.push("チェックアウト日時はチェックイン日時以降をご指定ください。");
    } else if (checkoutDate.getHours() > 10) {
      document.getElementById("checkoutError").textContent =
        "チェックアウトは～10:00までです。";
      errors.push("チェックアウトは～10:00までです。");
    }
  }
  const adults = document.getElementById("adults").value;
  if (!adults) {
    document.getElementById("adultsError").textContent =
      "大人の人数は必須です。";
    errors.push("大人の人数は必須です。");
  }
  const children = document.getElementById("children").value;
  if (!children) {
    document.getElementById("childrenError").textContent =
      "子どもの人数は必須です。";
    errors.push("子どもの人数は必須です。");
  }

  const confirmationMessage = document.getElementById("confirmationMessage");
  if (errors.length === 0) {
    confirmationMessage.style.display = "block";
  }

  console.log(errors);
});

const queryPlans = 'input[name="plan"]';
const plans = document.querySelectorAll(queryPlans);
plans.forEach((v) => {
  v.addEventListener("click", toggleMealOptions);
});

function toggleMealOptions() {
  const plan = document.querySelector('input[name="plan"]:checked');
  if (!plan) return;

  const mealType = plan.value;
  const dinnerCheckbox = document.getElementById("dinner");
  const breakfastCheckbox = document.getElementById("breakfast");

  if (mealType === "with_meal") {
    dinnerCheckbox.disabled = false;
    breakfastCheckbox.disabled = false;
    dinnerCheckbox.checked = true;
    breakfastCheckbox.checked = true;
  } else {
    dinnerCheckbox.disabled = true;
    breakfastCheckbox.disabled = true;
    dinnerCheckbox.checked = false;
    breakfastCheckbox.checked = false;
  }
}

// 郵便番号での住所情報の取得
function fetchAddressFromPostalCode() {
  const postalCode = document.getElementById("postal_code").value;
  if (!/^\d{3}-\d{4}$/.test(postalCode)) return;
  const url = `https://api.zipaddress.net/?zipcode=${postalCode.replace(
    "-",
    ""
  )}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
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
      const confirmationMessage = document.getElementById(
        "confirmationMessage"
      );
      if (errors.length === 0) {
        confirmationMessage.style.display = "block";
      }
    });
}
