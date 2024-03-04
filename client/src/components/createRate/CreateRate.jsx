import { Field, Form, Formik } from "formik";
import arrowIcon from "../../assets/arrow-icon.svg";
import bookmarkIcon from "../../assets/bookmark-icon.svg";
import InputField from "../../shared/inputField/InputField";
import { defaultValidate, validateNumberInput } from "../../utils/helpers";

import "./createRate.scss";


const CreateRate = () => {

  const handleSubmit = (data) => {
    console.log(data);
  }

  return (
    <Formik
      initialValues={{
        market_rate: '',
        coin_rate: '',
        dollar_rate: '',
        sold_currency: '',
        bought_currency: 'USD',
        market_rate_other: '',
        round_num: '',
        // image: null,
        image: '',
        exchange_direction: 'S',
        hidden: false,
      }}
      onSubmit={handleSubmit}
    >
      <Form className="rate-create">
        <div className="rate-create__header">
          <h2 className="title__box rate-create__title">Create rate</h2>
          <button
            className="btn-simp rate-create__btn"
            type="submit"
          > Create <img src={bookmarkIcon} alt="bookmark" />
          </button>
        </div>
        <div className="rate-create__wrapper">
          <div className="rate-create__inner">
            <InputField name="sold_currency" label="Coin Currency" />
            <InputField name="coin_rate" label="Coin Rate" onChange={validateNumberInput} />
            <img className="rate-create__arrow" src={arrowIcon} alt="arrow left" />
            <InputField name="bought_currency" label="Dollar Currency" />
            <InputField name="dollar_rate" label="Dollar Rate" onChange={validateNumberInput} />
          </div>

          <InputField name="market_rate" label="Murkup" onChange={validateNumberInput} />
          <InputField name="market_rate_other" label="Murkup 2" onChange={validateNumberInput} />
          <InputField name="round_num" label="Rounding" onChange={validateNumberInput} />
          <InputField name="image" label="Image" />
        </div>
      </Form>
    </Formik>
  );
};

export default CreateRate;