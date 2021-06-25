import React from "react";

function CurrencyInput(props) {
  return (
    <div>
      <input
        className="input"
        value={props.amount}
        onChange={props.onChangeAmount}
      />
      <select value={props.selectedCurrency} onChange={props.currencyChange}>
        {props.currencyCodes.map((currency, i) => (
          <option key={i} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyInput;
