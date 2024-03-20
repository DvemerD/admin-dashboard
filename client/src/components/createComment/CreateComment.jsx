import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useCreateCommentMutation } from "../../redux/api/commentsApi";
import HeartRating from "../../shared/heartRating/HeartRating";

import "./createComment.scss";


const CreateComment = () => {
  const [rating, setRating] = useState(0);
  const [createComment] = useCreateCommentMutation();

  const handleSubmit = (values) => {
    const data = { ...values, rating }

    console.log(data);
  };

  return (
    <Formik
      initialValues={{
        username: '',
        text: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string().required("Required!"),
        text: Yup.string().required("Required!"),
      })}
      onSubmit={(values, { resetForm }) => {
        createComment({ ...values, rating })
          .then(res => {
            resetForm();
            setRating(0);
          })
      }}
    >
      <Form className="comment__form">
        <div className="comment__box">
          <Field
            type="text"
            id="username"
            name="username"
            className="comment__form__input"
          />
          <ErrorMessage className="error-message" name="username" component="div" />
        </div>
        <div className="comment__box comment__box_grow">
          <Field
            id="text"
            name="text"
            component="textarea"
            className="comment__form__input"
          />
          <ErrorMessage className="error-message" name="text" component="div" />
        </div>

        <div className="comment__form__footer">
          <HeartRating rating={rating} setRating={setRating} />
          <button className="comment__form__btn">Save</button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateComment;