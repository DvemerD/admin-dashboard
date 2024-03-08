import { memo, useRef, useState } from "react";
import { useFormikContext } from "formik";
import useOutsideClick from "../../hooks/UseOutsideClick";
import arrowMore from "../../assets/arrow-more-icon.svg";
import arrowHide from "../../assets/arrow-hide-icon.svg";

import "./selectField.scss";

const SelectField = memo(({ name, label, options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const { setFieldValue } = useFormikContext();
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className="select" ref={dropdownRef}>
      <h2 className="label">{label}</h2>
      <div className="select__btn">
        <div className="select__header" onClick={() => setIsOpen(!isOpen)}>
          {selectedOption}
          <img src={isOpen ? arrowHide : arrowMore} alt="icon" />
        </div>
        <ul className={`select__list ${isOpen && "select__list_active"}`}>
          {options.map((option, i) => (
            <li
              className="select__list__item"
              key={i}
              onClick={() => {
                setSelectedOption(option);
                setFieldValue(name, option.charAt(0).toUpperCase());
                setIsOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
});

export default SelectField;