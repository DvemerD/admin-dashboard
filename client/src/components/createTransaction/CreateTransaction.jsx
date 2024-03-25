import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";
import { useCreateTransactionMutation, useGetUserInfoQuery } from "../../redux/api/usersApi";
import { useGetRatesQuery } from "../../redux/api/ratesApi";
import SelectField from "../../shared/selectField/SelectField";
import arrowIcon from "../../assets/arrow-icon.svg";
import bookmarkIcon from "../../assets/bookmark-icon.svg";

import "./createTransaction.scss";


const CreateTransaction = () => {
  const [valueCurrencyGive, setValueCurrencyGive] = useState([]);
  const [valueCurrencyReceive, setValueCurrencyReceive] = useState([]);
  const [valueGive, setValueGive] = useState(0);
  const [valueReceive, setValueReceive] = useState(0);
  const [valueTradeSold, setValueTradeSold] = useState(0);
  const [valueTradeBought, setValueTradeBought] = useState(0);
  const [marketRate, setMarketRate] = useState(0);
  const [selectedRate, setSelectedRate] = useState({});
  const { id } = useParams();
  const { data: rates = [], isLoadingRates, isErrorRates, errorRates } = useGetRatesQuery();
  const { data: userData = {} } = useGetUserInfoQuery(id);
  const [createTransaction, {
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    error: errorTransaction }] = useCreateTransactionMutation();

  useEffect(() => {
    let foundRate = {};

    if (valueCurrencyGive === "USD") {
      foundRate = rates.find(item =>
        item.sold_currency === valueCurrencyReceive &&
        item.bought_currency === valueCurrencyGive
      );
    } else {
      foundRate = rates.find(item =>
        item.sold_currency === valueCurrencyGive &&
        item.bought_currency === valueCurrencyReceive
      );
    }

    if (foundRate && !foundRate.hidden && valueCurrencyGive === "USD") {
      const obj = {
        ...foundRate,
        bought_currency: foundRate.sold_currency,
        sold_currency: foundRate.bought_currency,
        dollar_rate: foundRate.coin_rate,
        coin_rate: foundRate.dollar_rate
      };
      setSelectedRate(obj);
      setMarketRate(foundRate.market_rate);
    } else if (foundRate && !foundRate.hidden && valueCurrencyGive !== "USD") {
      setSelectedRate(foundRate);
      setMarketRate(foundRate.market_rate);
    } else {
      setSelectedRate(null);
      setMarketRate(0);
    }
  }, [rates, valueCurrencyGive, valueCurrencyReceive]);

  useEffect(() => {
    setValueTradeSold(valueGive);

    if (valueCurrencyGive === 'USD') {
      setValueReceive((valueGive / (selectedRate?.coin_rate || 1).toFixed(selectedRate?.round_num)))
    } else {
      setValueReceive((valueGive * (selectedRate?.dollar_rate || 0)).toFixed(selectedRate?.round_num))
    }

    setValueTradeBought((valueReceive - (valueReceive * (marketRate / 100))).toFixed(9));
  }, [valueCurrencyGive, valueCurrencyReceive,
    valueGive, valueReceive, marketRate, selectedRate]);

  return (<>
    {isErrorRates && <ErrorNotification error={errorRates} />}
    {isErrorTransaction && <ErrorNotification error={errorTransaction} />}
    <div className="transaction">
      <Formik
        initialValues={{
          coin_rate: '',
          sold_currency: '',
          dollar_rate: '',
          bought_currency: '',
          market_rate: '',
        }}
        onSubmit={(values, { resetForm }) => {
          const newValues = {
            ip_address: "0.0.0.0:0000",
            exchange_direction: `${valueCurrencyGive} - ${valueCurrencyReceive}`,
            sold_currency: valueCurrencyGive,
            bought_currency: valueCurrencyReceive,
            sold_amount: valueGive,
            bought_amount: valueReceive,
            dollar_rate: selectedRate?.dollar_rate,
            coin_rate: selectedRate?.coin_rate,
            transaction_rate: +(marketRate === 0 ? 0 : ((marketRate * valueReceive) / 100)).toFixed(9), // комиссия при обмене
            market_rate: marketRate,
            fo_id: userData.id,
            fo: {
              id: userData.id,
              name: userData.name,
              surname: userData.surname,
              birth_date: userData.birth_date,
              email: userData.email,
              telegram: userData.telegram,
              phone_number: userData.phone_number
            },
            sold: valueCurrencyGive !== 'USD' ? true : false,
            processed: true
          }
          createTransaction(newValues).unwrap()
            .then(res => resetForm());
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="transaction__header">
              <h2 className="transaction__title title__box">New transaction</h2>
              <button className="transaction__btn btn-tr" type="submit" disabled={isLoadingTransaction}>
                {isLoadingTransaction ? "Loading..." : "Create"} <img src={bookmarkIcon} alt="bookmark" />
              </button>
            </div>
            <div className="transaction__body">
              <div className="transaction__box">
                <div>
                  <div className="field__wrapper">
                    <label className="label" htmlFor="coin_rate">Client gives</label>
                    <input
                      type="text"
                      id="coin_rate"
                      name="coin_rate"
                      className="input field__input"
                      value={valueGive}
                      onChange={event => {
                        setValueGive(event.target.value);
                        setFieldValue("coin_rate", valueGive);
                      }}
                    />
                  </div>
                  <ErrorMessage className="error-message" name="coin_rate" component="div" />
                </div>
                <SelectField
                  name="sold_currency"
                  options={["USD", ...rates.map(item => item.sold_currency)]}
                  setValue={setValueCurrencyGive}
                />
              </div>
              <div className="transaction__box">
                <div>
                  <div className="field__wrapper">
                    <label className="label" htmlFor="dollar_rate">Client receives</label>
                    <input
                      type="text"
                      id="dollar_rate"
                      name="dollar_rate"
                      className="input field__input"
                      value={valueReceive}
                      onChange={event => setValueReceive(event.target.value)}
                    />
                  </div>
                  <ErrorMessage className="error-message" name="dollar_rate" component="div" />
                </div>
                <SelectField
                  name="bought_currency"
                  options={["USD", ...rates.map(item => item.sold_currency)]}
                  setValue={setValueCurrencyReceive}
                />
              </div>
              <div className="transaction__box">
                <div className="transaction__inner">
                  <h2 className="label">Market price (USD)</h2>
                  <div className="transaction__result">
                    {selectedRate ? (+selectedRate.coin_rate + " " + selectedRate.sold_currency) : 0}
                    <img className="user__arrow" src={arrowIcon} alt="arrow left" />
                    {selectedRate ? (+selectedRate.dollar_rate + " " + selectedRate.bought_currency) : 0}
                  </div>
                </div>
              </div>
              <div className="transaction__box">
                <div>
                  <div className="field__wrapper">
                    <label className="label" htmlFor="dollar_rate">Markup %</label>
                    <input
                      type="text"
                      id="market_rate"
                      name="market_rate"
                      className="input field__input"
                      value={marketRate}
                      onChange={event => {
                        setMarketRate(event.target.value);
                        setFieldValue("market_rate", marketRate);
                      }}
                    />
                  </div>
                  <ErrorMessage className="error-message" name="market_rate" component="div" />
                </div>
              </div>
              <div className="transaction__box">
                <div className="transaction__inner">
                  <h2 className="label">Trade</h2>
                  <div className="transaction__result">
                    {parseFloat(valueTradeSold) || 0}
                    <img className="user__arrow" src={arrowIcon} alt="arrow left" />
                    {parseFloat(valueTradeBought) || 0}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </>);
}

export default CreateTransaction;