import { useEffect, useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";
import { removeSession } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";

import docsIcon from "../../assets/docs-icon.svg";
import "./header.scss";


const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Removing a scroll for a page
    if (openMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openMenu]);

  const onLogout = () => {
    dispatch(removeSession());
  }
  
  return (
    <div className="header">
      <div
        className={`header__hamburger ${openMenu ? 'open' : ''}`}
        onClick={() => setOpenMenu(prevState => !prevState)}
        >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`header__menu ${openMenu ? 'open' : ''}`} onClick={() => setOpenMenu(false)}>
        <ul className={`header__menu-list ${openMenu ? 'open' : ''}`}>
          <li className="header__menu-list__item ">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "active" : ""
              }
            >
              New orders <span>0</span>
            </NavLink>
          </li>
          <li className="header__menu-list__item">
            <NavLink
              to="/history"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "active" : ""
              }
            >
              History
            </NavLink>
          </li>
          <li className="header__menu-list__item" >
            <NavLink
              to="/users"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "active" : ""
              }
            >
              Users
            </NavLink>
          </li>
          <li className="header__menu-list__item">
            <NavLink
              to="/comments"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "active" : ""
              }
            >
              Comments
            </NavLink>
          </li>
          <li className="header__menu-list__item">
            <NavLink
              to="/change-rate"
              className={({ isActive, isPending }) =>
                isPending ? "" : isActive ? "active" : ""
              }
            >
              Change rate
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="header__user">
        <button
          className="header__user-btn"
          onClick={() => onLogout()}
        >
          <img className="header__user-icon" src={docsIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Header;