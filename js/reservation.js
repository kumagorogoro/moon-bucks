// ハンバーガーメニュー
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

// pc-nav
let lastScrollTop = 0;
const navbar = document.querySelector("nav");
let isScrollEnabled = true;
window.addEventListener("scroll", function () {
  if (!isScrollEnabled) return;
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
  link.addEventListener("click", function (event) {
    if (link.textContent === "Top") {
      return;
    } else if (link.textContent === "Cafe") {
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

// form
const agreeCheckbox = document.getElementById("agree");
const submitBtn = document.getElementById("submit-btn");
agreeCheckbox.addEventListener("change", () => {
  if (agreeCheckbox.checked) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
});
if (!agreeCheckbox.checked) {
  submitBtn.disabled = true;
}
function toggleMealOptions() {
  const plan = document.querySelector('input[name="plan"]:checked').value;
  const dinnerCheckbox = document.getElementById("dinner");
  const breakfastCheckbox = document.getElementById("breakfast");
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
    event.preventDefault();
    var errorSpans = document.querySelectorAll(".error-mark");
    errorSpans.forEach(function (span) {
      span.textContent = "";
    });
    const errors = [];
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
    }
    var checkin = document.getElementById("checkin").value;
    if (!checkin) {
      document.getElementById("checkinError").textContent =
        "チェックイン日時は必須です。";
      errors.push("チェックイン日時は必須です。");
    } else {
      var checkinDate = new Date(checkin);
      var checkinHour = checkinDate.getHours();
      if (checkinHour < 15 || checkinHour > 19) {
        document.getElementById("checkinError").textContent =
          "チェックインは15:00〜19:00です。";
        errors.push("チェックインは15:00〜19:00です。");
      }
    }
    var checkout = document.getElementById("checkout").value;
    if (!checkout) {
      document.getElementById("checkoutError").textContent =
        "チェックアウト日時は必須です。";
      errors.push("チェックアウト日時は必須です。");
    } else {
      var checkinDate = new Date(document.getElementById("checkin").value);
      var checkoutDate = new Date(checkout);
      if (checkoutDate.getTime() <= checkinDate.getTime()) {
        document.getElementById("checkoutError").textContent =
          "チェックアウト日時はチェックイン日時以降をご指定ください。";
        errors.push(
          "チェックアウト日時はチェックイン日時以降をご指定ください。"
        );
      } else if (checkoutDate.getHours() > 10) {
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
    function toggleMealOptions() {
      const plan = document.querySelector('input[name="plan"]:checked').value;
      const dinnerCheckbox = document.getElementById("dinner");
      const breakfastCheckbox = document.getElementById("breakfast");
      if (plan === "with_meal") {
        dinnerCheckbox.disabled = false;
        breakfastCheckbox.disabled = false;
      } else {
        dinnerCheckbox.disabled = true;
        breakfastCheckbox.disabled = true;
        dinnerCheckbox.checked = false;
        breakfastCheckbox.checked = false;
      }
    }
    function validateMealSelection() {
      const plan = document.querySelector('input[name="plan"]:checked').value;
      if (plan === "with_meal") {
        const mealCheckboxes = document.querySelectorAll(
          'input[name="meal[]"]:checked'
        );
        if (mealCheckboxes.length === 0) {
          document.getElementById("mealError").textContent =
            "食事内容（夕食または朝食）を選択してください。";
          return false;
        } else {
          document.getElementById("mealError").textContent = "";
          return true; // 正常
        }
      }
      return true;
    }
    window.addEventListener("load", function () {
      toggleMealOptions();
    });
    const confirmationMessage = document.getElementById("confirmationMessage");
    if (errors.length === 0) {
      confirmationMessage.style.display = "block";
    }
  });
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
