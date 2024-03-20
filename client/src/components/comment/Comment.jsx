import { useDeleteCommentMutation } from "../../redux/api/commentsApi";
import Menu from "../../shared/menu/Menu";
import moreIcon from "../../assets/more-icon.svg"
import heartIcon from "../../assets/heart-icon.svg"
import heartEmptyIcon from "../../assets/heart-empty-icon.svg"

import "./comment.scss";


const Comment = ({ data }) => {
  const { text, rating, username } = data;
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  console.log(data)
  const handleDelete = () => {
    deleteComment(data.id)
  }

  return (
    <div className="comment__item">
      <div className="comment__item__header">
        <p className="comment__item__name">{username}</p>
        <Menu items={[
          { name: "Delete", onClick: handleDelete },
        ]} status={{ isLoading }} />
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