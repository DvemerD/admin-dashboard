import { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import calendarIcon from "../../assets/calendar-icon.svg";
import { countDays, formateDate } from "../../utils/helpers";
import useOutsideClick from "../../hooks/UseOutsideClick";

import './datePicker.scss';


const DatePicker = () => {
  const [value, onChange] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);

  useOutsideClick(popupRef, () => setIsOpen(false));

  const onCancelClick = () => {
    onChange([]); // for local
    setIsOpen(!isOpen);
  }

  const outDate = () => {
    if (Array.isArray(value) && value.length !== 0) {
      if (formateDate(value[0]) === formateDate(value[1])) {
        return `with ${formateDate(value[0])}`;
      } else {
        return `${formateDate(value[0])} - ${formateDate(value[1])}`;
      }
    }
  }

  return (
    <div className="filters__date" ref={popupRef}>
      <h2 className="filters__title">Select Date</h2>
      <div className="filters__panel">
        <input
          className="filters__date-input"
          placeholder={outDate()}>
        </input>
        <button className="filters__date-btn" onClick={() => setIsOpen(!isOpen)}>
          <img className="filters__date-icon" src={calendarIcon} alt="calendarIcon" />
        </button>
        {isOpen ?
          <div className="calendar__wrapper">
            <Calendar
              onChange={onChange}
              value={value}
              selectRange={true}
              locale={"en"}
              formatShortWeekday={(locale, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()]}
              showDoubleView={true}
            />
            <div className="calendar__footer">
              <div className="calendar__days">
                {(value.length !== 0) && `${Array.isArray(value) ? countDays(value) : '0 day'}`}
              </div>
              <div className="calendar_btns">
                <button
                  className="calendar_btn"
                  onClick={(onCancelClick)}>Cancel</button>
                <button
                  className="calendar_btn calendar_btn_blue"
                  onClick={() => setIsOpen(!isOpen)}>Done</button>
              </div>
            </div>
          </div> : null}
      </div>
    </div>
  )
};

export default DatePicker;