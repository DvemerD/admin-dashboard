import moreIcon from "../../assets/more-icon.svg"
import heartIcon from "../../assets/heart-icon.svg"
import heartEmptyIcon from "../../assets/heart-empty-icon.svg"
import Menu from "../../shared/menu/Menu";

import "./comment.scss";

const Comment = ({ data }) => {
  const { text, rating, username } = data;

  return (
    <div className="comment__item">
      <div className="comment__item__header">
        <p className="comment__item__name">{username}</p>
        <img
          className="comment__item__more"
          src={moreIcon}
          alt="more"
          onClick={() => toggleMenu()}
        />
        {/* <Menu /> */}
      </div>
      <p className="comment__item__descr">{text}</p>
      <div className="comment__rating">
        {[...Array(5)].map((_, index) => (
          <img src={index < rating ? heartIcon : heartEmptyIcon} alt="" key={index} />
        ))}
      </div>
    </div>
  );
};

export default Comment;