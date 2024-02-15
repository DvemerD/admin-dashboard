import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useLoginMutation } from '../../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setSession } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

import './loginPage.scss';


const LoginPage = () => {
  const [login, { isLoading, isError, error = "" }] = useLoginMutation();
  const [displayError, setDisplayError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setDisplayError(true);
    }
  }, [isError]);

  return (
    <main className="login" onClick={() => setDisplayError(false)}>
      <div className="login__wrapper">
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={(values) => {
            login(values)
              .then(payload => {
                dispatch(setSession({
                  token: payload.data.access
                }));
                navigate('/');
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          <Form className={`login__form ${displayError && 'login__form_error'}`}>
            {displayError &&
              (<div className="login__error-message">
                password or username is incorrect!
              </div>)
            }
            <div className="login__box">
              <Field
                className="login__input"
                name="username"
                type="text"
                placeholder="Log in"
              />
            </div>
            <div className="login__box">
              <Field
                className="login__input"
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <button className="login__btn" type="submit" disabled={isLoading}>Press enter -</button>
          </Form>
        </Formik>
      </div>
    </main>
  )
}

export default LoginPage;