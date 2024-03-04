import { Field, useField } from "formik";
import "./selestField.scss";

const SelectField = ({ name, label }) => {
  const [field, meta] = useField(name);
  return (
    <div className="cusom-select">
      <label htmlFor={name}>{label}</label>
      <select {...field} name={name} id={name}>

      </select>
    </div>
  )
}

export default SelectField;