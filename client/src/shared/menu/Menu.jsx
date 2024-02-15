import "./menu.scss";

const process = "idle";

const Menu = ({ items }) => {

  return (
    <ul className="menu__more">
      {
        process === "loading" ?
          <li className="menu__item-first">Loading...</li> :
          <>
            <li
              className="menu__item-first"
            // onClick={() => onDelete(data.id)}
            >Remove</li>
            <li>
              Hello
            </li>
          </>
      }
    </ul>
  );
};

export default Menu;