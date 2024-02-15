import { useState } from "react";

import "./filters.scss";
import DatePicker from "../datePicker/DatePicker";

const currencyBtns = [
  { name: "BTC", text: "Bitcoin (BTC)", active: false },
  { name: "USDT", text: "Tether (USDT)", active: false },
  { name: "ETH", text: "Ethereum (ETH)", active: false },
  { name: "XRP", text: "Ripple (XRP)", active: false },
  { name: "LTC", text: "Litecoin (LTC)", active: false },
  { name: "USD", text: "USD", active: false },
];

const Filters = ({ openFilters }) => {
  const [givesButtons, setGivesButtons] = useState(currencyBtns);
  const [receivesButtons, setReceivesButtons] = useState(currencyBtns);

  const renderButtons = (buttons, setButtons) => {
    return buttons.map(({ name, text, active }, i) => (
      <button
        key={i}
        className={`filters__btn ${active ? "filters__btn_active" : ""}`}
        data-name={name}
      >{text}</button>
    ))
  }

  return (
    <div className="filters">
      <div className={`filters__wrapper ${openFilters ? "filters__wrapper_active" : ""}`}>
        <div className="filters__blocks">
          <div className="filters__inner-btns">
            <h2 className="filters__title">Client gives</h2>
            <div className="filters__btns">
              {renderButtons(givesButtons)}
            </div>
          </div>
          <div className="filters__inner-btns">
            <h2 className="filters__title">Client receives</h2>
            <div className="filters__btns">
              {renderButtons(receivesButtons)}
            </div>
          </div>
        </div>
        <DatePicker />
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Filters;