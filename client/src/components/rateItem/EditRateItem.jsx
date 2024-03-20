import { ErrorMessage, Formik } from "formik";
import * as Yup from 'yup';
import { validateNumberInput } from "../../utils/helpers";
import { usePutRateMutation } from "../../redux/api/ratesApi";
import Menu from "../../shared/menu/Menu";
import CheckboxField from "../../shared/checkboxField/CheckboxField";
import FileLoaderField from "../../shared/fileLoaderField/FileLoaderField";
import InputField from "../../shared/inputField/InputField";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";
import arrowIcon from "../../assets/arrow-icon.svg";

import "./RateItem.scss";


const EditRateItem = ({ data, setOpenEdit }) => {
  const [putRate, { isLoading, isSuccess, isError, error }] = usePutRateMutation();

  return (<>
    <tr>
      {isError && <ErrorNotification error={error} />}
    </tr>
    <Formik
      initialValues={data}
      validationSchema={Yup.object({
        coin_rate: Yup.number().required("Required!"),
        dollar_rate: Yup.number().required("Required!"),
        market_rate: Yup.number().required("Required!"),
        market_rate_other: Yup.number().required("Required!"),
        round_num: Yup.number().required("Required!"),
        image: Yup.mixed().required("Required!")
      })}
      onSubmit={(values) => {
        const obj = { ...values };

        if (typeof obj.image === "string") {
          delete obj.image;
        }

        const formData = new FormData();
        for (const [key, value] of Object.entries(obj)) {
          formData.append(key, value);
        }

        putRate({ id: data.id, data: formData }).unwrap()
          .then(res => {
            setOpenEdit(false);
          });
      }}
    >
      {({ submitForm }) => (
        <tr className="rate-item">
          <td data-title="ID">
            {data.id}
          </td>
          <td data-title="Currency">
            <div className="center__content">
              {data.sold_currency}&nbsp;<img className="arrow-icon" src={arrowIcon} alt="arrow left" />&nbsp;{data.bought_currency}
            </div>
          </td>
          <td data-title="Bank rate">
            <div className="center__content">
              <div>
                <InputField name="coin_rate" onChange={validateNumberInput} />
                <ErrorMessage className="error-message" name="coin_rate" component="div" />
              </div>&nbsp;
              <img className="tabele__arrow" src={arrowIcon} alt="arrow left" />&nbsp;
              <div>
                <InputField name="dollar_rate" onChange={validateNumberInput} />
                <ErrorMessage className="error-message" name="dollar_rate" component="div" />
              </div>
            </div>
          </td>
          <td data-title="Markup">
            <div>
              <InputField name="market_rate" onChange={validateNumberInput} />
              <ErrorMessage className="error-message" name="market_rate" component="div" />
            </div>
          </td>
          <td data-title="Markup 2">
            <div>
              <InputField name="market_rate_other" onChange={validateNumberInput} />
              <ErrorMessage className="error-message" name="market_rate_other" component="div" />
            </div>
          </td>
          <td data-title="Rounding">
            <div>
              <InputField name="round_num" onChange={validateNumberInput} />
              <ErrorMessage className="error-message" name="round_num" component="div" />
            </div>
          </td>
          <td data-title="Hidden">
            <CheckboxField name="hidden" />
          </td>
          <td data-title="Image">
            <div>
              <FileLoaderField name="image" />
              <ErrorMessage className="error-message" name="image" component="div" />
            </div>
          </td>
          <td className="table__more">
            <Menu
              items={[
                { name: "Save", onClick: () => submitForm() },
                { name: "Cancel", onClick: () => setOpenEdit(false) }
              ]}
              status={{ isLoading, isSuccess }} />
          </td>
        </tr>
      )}
    </Formik>
  </>);
}

export default EditRateItem;