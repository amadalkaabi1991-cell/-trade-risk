let side = "LONG";

const balanceInput = document.getElementById("balance");
const riskInput = document.getElementById("risk");

const entryInput = document.getElementById("entry");
const stopInput = document.getElementById("stop");

const balanceDisplay =
  document.getElementById("balanceDisplay");

const riskDisplay =
  document.getElementById("riskDisplay");

const riskAmount =
  document.getElementById("riskAmount");

const distance =
  document.getElementById("distance");

const quantity =
  document.getElementById("quantity");

const notional =
  document.getElementById("notional");

const error =
  document.getElementById("error");

const longButton =
  document.getElementById("longButton");

const shortButton =
  document.getElementById("shortButton");


function number(value) {
  return Number(value);
}


function format(value, decimals = 6) {

  if (!Number.isFinite(value)) {
    return "—";
  }

  return value.toLocaleString(
    "en-US",
    {
      maximumFractionDigits: decimals
    }
  );
}


function showError(message) {

  error.textContent = message;

  error.classList.remove("hidden");
}


function clearError() {

  error.textContent = "";

  error.classList.add("hidden");
}


function calculate() {

  clearError();

  const balance =
    number(balanceInput.value);

  const risk =
    number(riskInput.value);

  const entry =
    number(entryInput.value);

  const stop =
    number(stopInput.value);


  if (balance <= 0) {

    showError("أدخل رصيدًا صحيحًا.");

    return;
  }


  if (risk <= 0 || risk > 100) {

    showError(
      "نسبة المخاطرة يجب أن تكون بين 0.01% و100%."
    );

    return;
  }


  const amountAtRisk =
    balance * (risk / 100);


  balanceDisplay.textContent =
    format(balance, 2);

  riskDisplay.textContent =
    format(amountAtRisk, 2);

  riskAmount.textContent =
    format(amountAtRisk, 2) + " USDT";


  if (entry <= 0 || stop <= 0) {

    distance.textContent = "—";
    quantity.textContent = "—";
    notional.textContent = "—";

    return;
  }


  if (side === "LONG" && stop >= entry) {

    showError(
      "في صفقة LONG يجب أن يكون وقف الخسارة أقل من سعر الدخول."
    );

    return;
  }


  if (side === "SHORT" && stop <= entry) {

    showError(
      "في صفقة SHORT يجب أن يكون وقف الخسارة أعلى من سعر الدخول."
    );

    return;
  }


  const stopDistance =
    Math.abs(entry - stop);


  const qty =
    amountAtRisk / stopDistance;


  const nominalValue =
    qty * entry;


  distance.textContent =
    format(stopDistance, 6);

  quantity.textContent =
    format(qty, 8);

  notional.textContent =
    format(nominalValue, 2) + " USDT";
}


longButton.addEventListener(
  "click",
  function () {

    side = "LONG";

    longButton.classList.add("active");
    shortButton.classList.remove("active");

    calculate();
  }
);


shortButton.addEventListener(
  "click",
  function () {

    side = "SHORT";

    shortButton.classList.add("active");
    longButton.classList.remove("active");

    calculate();
  }
);


[
  balanceInput,
  riskInput,
  entryInput,
  stopInput
].forEach(
  element => {

    element.addEventListener(
      "input",
      calculate
    );

  }
);


document
  .getElementById("calculate")
  .addEventListener(
    "click",
    calculate
  );


calculate();
