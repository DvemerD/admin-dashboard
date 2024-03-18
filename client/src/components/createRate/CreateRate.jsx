import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import arrowIcon from "../../assets/arrow-icon.svg";
import bookmarkIcon from "../../assets/bookmark-icon.svg";
import InputField from "../../shared/inputField/InputField";
import FileLoaderField from "../../shared/fileLoaderField/FileLoaderField";
import { validateNumberInput } from "../../utils/helpers";
import { useCreateRateMutation } from "../../redux/api/ratesApi";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";

import "./createRate.scss";


const CreateRate = () => {
  const [createRate, { isLoading, isError, error }] = useCreateRateMutation();

  return (
    <>
      {isError && <ErrorNotification error={error} />}
      <Formik
        initialValues={{
          sold_currency: '',
          coin_rate: '1',
          bought_currency: 'USD',
          dollar_rate: '',
          market_rate: '',
          market_rate_other: '',
          round_num: '',
          image: '',
          exchange_direction: 'S',
          hidden: false,
        }}
        validationSchema={Yup.object({
          sold_currency: Yup.string().required("Required!"),
          coin_rate: Yup.number().required("Required!"),
          bought_currency: Yup.string().required("Required!"),
          dollar_rate: Yup.number().required("Required!"),
          market_rate: Yup.number().required("Required!"),
          market_rate_other: Yup.number().required("Required!"),
          round_num: Yup.number().required("Required!"),
          image: Yup.mixed().required("Required!")
        })}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();
          for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
          }
          createRate(formData).unwrap();
          resetForm();
        }}
      >
        <Form className="rate-create">
          <div className="rate-create__header">
            <h2 className="title__box rate-create__title">Create rate</h2>
            <button
              className="btn-simp rate-create__btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Create"} <img src={bookmarkIcon} alt="bookmark" />
            </button>
          </div>
          <div className="rate-create__wrapper">
            <div className="rate-create__inner">
              <div>
                <InputField name="sold_currency" label="Coin Currency" />
                <ErrorMessage className="error-message" name="sold_currency" component="div" />
              </div>
              <div>
                <InputField name="coin_rate" label="Coin Rate" onChange={validateNumberInput} />
                <ErrorMessage className="error-message" name="coin_rate" component="div" />
              </div>
              <img className="rate-create__arrow" src={arrowIcon} alt="arrow left" />
              <div>
                <InputField name="bought_currency" label="Dollar Currency" />
                <ErrorMessage className="error-message" name="bought_currency" component="div" />
              </div>
              <div>
                <InputField name="dollar_rate" label="Dollar Rate" onChange={validateNumberInput} />
                <ErrorMessage className="error-message" name="dollar_rate" component="div" />
              </div>
            </div>
            <div>
              <InputField name="market_rate" label="Murkup" onChange={validateNumberInput} />
              <ErrorMessage className="error-message" name="market_rate" component="div" />
            </div>
            <div>
              <InputField name="market_rate_other" label="Murkup 2" onChange={validateNumberInput} />
              <ErrorMessage className="error-message" name="market_rate_other" component="div" />
            </div>
            <div>
              <InputField name="round_num" label="Rounding" onChange={validateNumberInput} />
              <ErrorMessage className="error-message" name="round_num" component="div" />
            </div>
            <div>
              <FileLoaderField name="image" label="Image" />
              <ErrorMessage className="error-message" name="image" component="div" />
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default CreateRate;