import Comment from "../../components/comment/Comment";
import CreateComment from "../../components/createComment/CreateComment";

import "./commentsPage.scss";

const CommentsPage = () => {
  return (
    <main className="comment">
      <div className="comments__wrapper">
        <CreateComment />
        <Comment data={{text: "Hello World!!!", rating: 3, username: "Joe Doe"}}/>
        <Comment data={{text: "Hello World!!!", rating: 3, username: "Joe Doe"}}/>
        <Comment data={{text: "Hello World!!!", rating: 3, username: "Joe Doe"}}/>
        <Comment data={{text: "Hello World!!!", rating: 3, username: "Joe Doe"}}/>
        <Comment data={{text: "Hello World!!!", rating: 3, username: "Joe Doe"}}/>
        <Comment data={{text: "Hello World!!!", rating: 3, username: "Joe Doe"}}/>
      </div>
    </main>
  );
};

export default CommentsPage;