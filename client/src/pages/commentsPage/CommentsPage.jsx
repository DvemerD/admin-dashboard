import Comment from "../../components/comment/Comment";
import CreateComment from "../../components/createComment/CreateComment";
import { useGetCommentsQuery } from "../../redux/api/commentsApi";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";

import "./commentsPage.scss";

const CommentsPage = () => {
  const { data: comments = [], isLoading, isError, error } = useGetCommentsQuery();

  return (
    <>
      {isError && <ErrorNotification error={error} />}
      <main className="comment">
        <div className="comments__wrapper">
          <CreateComment />
          {comments.map((item, i) => (
            <Comment key={i} data={item} />
          ))}
        </div>
      </main>
    </>
  );
};

export default CommentsPage;