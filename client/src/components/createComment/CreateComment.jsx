import { useState } from "react";
import { Formik, Form, Field } from "formik";
import HeartRating from "../../shared/heartRating/HeartRating";

import "./createComment.scss";

const initialValues = {
  username: '',
  text: '',
};

const CreateComment = () => {
  const [rating, setRating] = useState(0);

  const handleSubmit = (values) => {
    const data = { ...values, rating }

    console.log(data);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="comment__form">
        <Field
          type="text"
          id="username"
          name="username"
          className="comment__form__input"
        />
        <Field
          id="text"
          name="text"
          component="textarea"
          className="comment__form__input"
        />
        <div className="comment__form__footer">
          <HeartRating rating={rating} setRating={setRating} />
          <button className="comment__form__btn">Save</button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateComment;