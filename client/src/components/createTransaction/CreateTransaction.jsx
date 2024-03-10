import { useState } from "react";
import { Form, Formik } from "formik";
import InputField from "../../shared/inputField/InputField";
import SelectField from "../../shared/selectField/SelectField";
import { validateNumberInput } from "../../utils/helpers";
import arrowIcon from "../../assets/arrow-icon.svg";
import bookmarkIcon from "../../assets/bookmark-icon.svg";

import "./createTransaction.scss";


const CreateTransaction = () => {
  const [options, setOptions] = useState([
    "USD", "BTC", "ETH", "LTC", "USDT", "XRP"
  ]);

  return (
    <div className="transaction">
      <Formik>
        <Form>
          <div className="transaction__header">
            <h2 className="transaction__title title__box">New transaction</h2>
            <button className="transaction__btn btn-tr">
              Create <img src={bookmarkIcon} alt="bookmark" />
            </button>
          </div>
          <div className="transaction__body">
            <div className="transaction__box">
              <InputField name="coin_rate" label="Client gives" onChange={validateNumberInput} />
              <SelectField name="sold_currency" options={options} />
            </div>
            <div className="transaction__box">
              <InputField name="dollar_rate" label="Client receives" onChange={validateNumberInput} />
              <SelectField name="bought_currency" options={options} />
            </div>
            <div className="transaction__box">
              <div className="transaction__inner">
                <h2 className="label">Market price (USD)</h2>
                <div className="transaction__result">
                  1
                  <img className="user__arrow" src={arrowIcon} alt="arrow left" />
                  64530
                </div>
              </div>
            </div>
            <div className="transaction__box">
              <InputField name="market_rate" label="Markup %" onChange={validateNumberInput} />
            </div>
            <div className="transaction__box">
              <div className="transaction__inner">
                <h2 className="label">Trade</h2>
                <div className="transaction__result">
                  1
                  <img className="user__arrow" src={arrowIcon} alt="arrow left" />
                  70000
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateTransaction;