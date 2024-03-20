import { useEffect, useRef, useState } from "react";
import useOutsideClick from "../../hooks/UseOutsideClick";
import { positionPopup } from "../../utils/helpers";
import moreIcon from "../../assets/more-icon.svg";

import "./menu.scss";


const Menu = ({ items, status }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const popupRef = useRef(null);
  const popupMenuRef = useRef(null);
  useOutsideClick(popupRef, () => setOpenMenu(false));

  useEffect(() => {
    positionPopup(popupMenuRef);
  }, [openMenu, status]);

  return (
    <div ref={popupRef}>
      <div className="menu__btn" onClick={() => setOpenMenu(!openMenu)}>
        <img src={moreIcon} alt="more info" />
      </div>
      {status.isLoading ?
        <ul className="menu__more" ref={popupMenuRef}>
          <li className="menu__item-first">Loading...</li>
        </ul> : null}
      {openMenu && <ul className="menu__more" ref={popupMenuRef}>
        {items.map((item, i) => {
          if (i === 0) {
            return (
              <li key={i} className="menu__item-first"
                onClick={() => {
                  item.onClick();
                  setOpenMenu(false);
                }}
              >{item.name}</li>
            )
          }
          return <li key={i}
            onClick={() => {
              item.onClick();
              setOpenMenu(false);
            }}>{item.name}</li>
        })}
      </ul>}
    </div>
  )
};

export default Menu;