
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");
const result = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");
const status = document.getElementById("status");

// Preset exchange rates relative to USD
const presetRates = {
    USD: 1,
    NGN: 0.00067,
    GBP: 1.29,
    EUR: 1.08,
    CAD: 0.72,
    GHS: 0.065,
    INR: 0.012,
    JPY: 0.0067
};

// Save preset rates in LocalStorage
if (!localStorage.getItem("exchangeRates")) {
    localStorage.setItem(
        "exchangeRates",
        JSON.stringify(presetRates)
    );
}

// Load saved rates
let rates = JSON.parse(
    localStorage.getItem("exchangeRates")
);

// Convert currency
function convertCurrency() {

    const amountValue = Number(amount.value);

    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!Number.isFinite(amountValue) || amountValue <= 0) {
        result.textContent = "Enter a valid amount";
        return;
    }

    // Convert through USD
    const exchangeRate = rates[from] / rates[to];

    const convertedAmount = amountValue * exchangeRate;

    result.textContent =
        convertedAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + " " + to;

    rateInfo.textContent =
        `1 ${from} = ${exchangeRate.toFixed(4)} ${to}`;

}

// Convert button
convertBtn.addEventListener("click", convertCurrency);

// Swap currencies
swapBtn.addEventListener("click", function() {

    const temporary = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = temporary;

    convertCurrency();
});

// Automatic conversion
amount.addEventListener("input", convertCurrency);

fromCurrency.addEventListener("change", convertCurrency);

toCurrency.addEventListener("change", convertCurrency);

// Initial conversion
convertCurrency();
