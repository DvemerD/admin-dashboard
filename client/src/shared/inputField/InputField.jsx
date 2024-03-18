import { Field } from "formik";

import "./inputField.scss";

const InputField = ({ name, label = "", onChange = (event, field) => field.onChange(event) }) => (
  <Field name={name}>
    {({ field }) => (
      <div className="field__wrapper">
        <label className="label" htmlFor={field.name}>{label}</label>
        <input
          type="text"
          className="input field__input"
          {...field}
          onChange={event => onChange(event, field)}
        />
      </div>
    )}
  </Field>
);

export default InputField;