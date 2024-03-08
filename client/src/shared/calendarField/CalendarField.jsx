import { memo, useState, useRef, useEffect } from "react";
import { Field, useFormikContext } from "formik";
import Calendar from 'react-calendar';
import { formateDate } from "../../utils/helpers";
import calendarIcon from "../../assets/calendar-icon.svg";
import useOutsideClick from "../../hooks/UseOutsideClick";

import "./calendarField.scss";


const CalendarField = memo(({ name, label = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [valueCalendar, setValueCalendar] = useState(null);
  const { setFieldValue } = useFormikContext();
  const calendarRef = useRef();
  const calendarPopupRef = useRef();

  useOutsideClick(calendarRef, () => setIsOpen(false));

  useEffect(() => {
    if (calendarPopupRef.current) {
      const calendar = calendarPopupRef.current;
      const rect = calendar.getBoundingClientRect();
      const offset = 0;

      if (rect.left < 0) {
        calendar.style.left = `${offset}px`;
      } else if (rect.right > window.innerWidth) {
        calendar.style.right = `${offset}px`;
      }

      if (rect.bottom > window.innerHeight) {
        calendar.style.bottom = `${35}px`;
      }
    }
  }, [isOpen]);

  return (
    <div className="calendar" ref={calendarRef}>
      <label className="label" htmlFor={name}>{label}</label>
      <div className="calendar__inner">
        <Field className="input field__input" type="text" name={name} id={name} />
        <button
          className="calendar__btn"
          onClick={() => { }}
          type="button"
        >
          <img src={calendarIcon} alt="icon" onClick={() => setIsOpen(!isOpen)} />
        </button>
      </div>
      {isOpen &&
        <div className="calendar__popup" ref={calendarPopupRef}>
          <Calendar
            onChange={(value) => {
              setFieldValue(name, formateDate(value));
              setValueCalendar(value);
            }}
            value={valueCalendar}
            locale="en"
            formatShortWeekday={(locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]}
          />
        </div>}
    </div>
  )
});

export default CalendarField;