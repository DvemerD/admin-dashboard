import { memo } from "react";
import { useField } from "formik";
import chekIcon from "../../assets/delivered-icon.svg";

import "./checkboxField.scss";


const CheckboxField = memo(({ name, label = "" }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;

  const toggleChecked = (e) => {
    e.preventDefault();
    setValue(!value);
  }

  return (
    <div className="checkbox">
      <label className="label" htmlFor={name}>{label}</label>
      <input
        {...field}
        name={name}
        id={name}
        className="checkbox__hide"
        type="checkbox"
      />
      <button
        className="checkbox__btn"
        onClick={toggleChecked}
      >
        {value ? <img src={chekIcon} alt="cheked" /> : null}
      </button>
    </div>
  )
});

export default CheckboxField;