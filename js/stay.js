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
            document.getElementById("nameError").textContent =
              "名前は必須です。";
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
            errors.push(
              "郵便番号は正しい形式で入力してください（例: 123-4567）。"
            );
          }

          var prefecture = document.getElementById("prefecture").value;
          if (!prefecture) {
            document.getElementById("prefectureError").textContent =
              "都道府県は必須です。";
            errors.push("都道府県は必須です。");
          }

          var city = document.getElementById("city").value;
          if (!city) {
            document.getElementById("cityError").textContent =
              "市区町村は必須です。";
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
            var checkinDate = new Date(
              document.getElementById("checkin").value
            );
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

          var mealType = document.querySelector(
            'input[name="meal_type"]:checked'
          );
          if (!mealType) {
            document.getElementById("mealError").textContent =
              "食事タイプは必須です。";
            errors.push("食事タイプは必須です。");
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

        const url = `https://api.zipaddress.net/?zipcode=${postalCode.replace('-', '')}`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
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
          .catch(error => {
            console.error("住所の取得エラー:", error);
            alert("住所情報の取得に失敗しました。");
          });
      }

      // バリデーション等は他の部分と同様に進めてください
      function validateForm(event) {
        // ここにバリデーションのコードを追加
      }