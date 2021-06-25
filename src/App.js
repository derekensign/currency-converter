import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import "./styles.css";
import CurrencyInput from "./CurrencyInput";
import axios from "axios";

//Currency Converter

//Create a currency converter that converts a user’s selected base currency and outputs the equivalent money value of the exchange currency using the current day’s rate.

//Include two select inputs, one for base currency and second for equivalent currency, which make use of the json found at:
//https://gist.githubusercontent.com/mddenton/062fa4caf150bdf845994fc7a3533f74/raw/27beff3509eff0d2690e593336179d4ccda530c2/Common-Currency.json

//For the base currency, create a masked currency input that:

// Shows the symbol of the selected base currency
// Is formatted to two decimal places
// On focus sets the caret to the rightmost decimal position.
// Only allows numbers
// Each new number is added to the right most position
// When a new number is inserted shifts the decimal right one place
// For example, when the user enters 1, the amount would be $0.01, then upon entering 2, the amount would be $0.12, and upon entering 3, the amount would be $1.23
// When deleted shifts the decimal left one place
// Please complete as many of the currency input objectives as possible since we place heavy emphasis on your currency input.

// Currency rates are available from https://api.exchangeratesapi.io/latest?base=USD

// Use the money.js library (see this codesandbox's package.json) to convert the selected base currency to its chosen equivalent money value.
// In other words, use the exchange rate API above for the rate. Use the money.js library to convert amounts based on that rate.
// For more details: http://openexchangerates.github.io/money.js/

// Best practice would be to inform the user if their selected currency is not available from fixer.io using inline validation. In order to more easily test error handling, allow the user to select a currency not available from fixer.io and present the error returned.

// Show the equivalent money value's currency symbol which is included in the above Common-Currency.json endpoint.

// Do not use a 3rd party library for your currency input.

// Use React but do not include jQuery in your project.
// Use of React class component vs functional component with hooks is whichever you prefer.

function App() {
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const [inputCurrency, setInputCurrency] = useState();
  const [outputCurrency, setOutputCurrency] = useState();
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState();

  // console.log(`Input Currency is ${inputCurrency}`);
  // console.log(`Output Currency is ${outputCurrency}`);
  // console.log(`Input Amount is ${inputAmount}`);
  // console.log(`Output Amount is ${outputAmount}`);
  // console.log(`Exchange Rate is ${exchangeRate}`);

  const getRates = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}`);
      setCurrencyCodes([
        response.data.base,
        ...Object.keys(response.data.rates)
      ]);
      const firstCurrency = Object.keys(response.data.rates)[0];
      setInputCurrency(response.data.base);
      setOutputCurrency(firstCurrency);
      setExchangeRate(response.data.rates[firstCurrency]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRates = async () => {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}&base=${inputCurrency}`
      );
      setExchangeRate(response.data.rates[outputCurrency]);
      setOutputAmount(
        (inputAmount.replace(/(-(?!\d))|[^0-9|-]/g, "") || "") * exchangeRate
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setInputAmount(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: inputCurrency
      }).format((e.target.value.replace(/(-(?!\d))|[^0-9|-]/g, "") || "") / 100)
    );
    setOutputAmount(
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: outputCurrency
      }).format(
        ((e.target.value.replace(/(-(?!\d))|[^0-9|-]/g, "") || "") / 100) *
          exchangeRate
      )
    );
  };

  const handleInputCurrencyChange = (e) => {
    setInputCurrency(e.target.value);
  };

  useEffect(() => {
    getRates();
  }, []);

  useEffect(() => {
    updateRates();
  }, [inputCurrency, outputCurrency]);

  return (
    <div>
      <h1>Currency Converter</h1>

      <CurrencyInput
        currencyCodes={currencyCodes}
        selectedCurrency={inputCurrency}
        currencyChange={handleInputCurrencyChange}
        amount={inputAmount}
        onChangeAmount={handleInputChange}
      />

      <CurrencyInput
        currencyCodes={currencyCodes}
        selectedCurrency={outputCurrency}
        currencyChange={(e) => setOutputCurrency(e.target.value)}
        amount={outputAmount}
      />
    </div>
  );
}

export default App;
