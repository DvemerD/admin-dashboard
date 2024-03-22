import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { formateDate } from "../../utils/helpers";
import deliveredIcon from "../../assets/delivered-icon.svg";
import closeIcon from "../../assets/close-icon.svg";
import InputField from "../../shared/inputField/InputField";
import CheckboxField from "../../shared/checkboxField/CheckboxField";
import FileLoaderField from "../../shared/fileLoaderField/FileLoaderField";
import SelectField from "../../shared/selectField/SelectField";
import CalendarField from "../../shared/calendarField/CalendarField";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";

import "./userForm.scss";

const initial = {
  id: '',
  initials: '',
  date_indentifier: new Date(),
  po: '',
  phone_number: '',
  telegram: '',
  email: '',
  skan_wallet: '',
  corresponds: '',
  deals_made: '',
  total_amount: 0,
  transaction_count: 0,
  birth_date: '1000-01-01',
  nationality: '',
  place_birth: '',
  gender: '',
  birth_number: '',
  address_residence: '',
  type_id_card: '',
  indetity_card_number: '',
  date_of_validity_from: '',
  date_of_validity_until: '',
  authority: '',
  country: '',
  pep_client: '',
  sanctions: '',
  business_name: '',
  id_number: '',
  address: '',
  country_at_risk: '',
  screening_of_the_client: '',
  client_legal_entity: '',
  skan_id: '',
  skan_person: '',
  client_acts: {
    address: '',
    business_name: '',
    country_at_risk: '',
    id_number: '',
    screening_of_the_client: ''
  }
}

const UserForm = ({ handlerUser,
  status: { isLoading, isError, error },
  initialsValues = initial, isEdit = false }) => {
  const navigate = useNavigate();

  return (<>
    {isError && <ErrorNotification error={error} />}
    <main className="user-edit">
      <Formik
        initialValues={initialsValues}
        validationSchema={Yup.object({
          initials: Yup.string().required("Required!"),
          phone_number: Yup.string().required("Required!"),
          email: Yup.string().email("Invalid email format!").required("Required!")
        })}
        onSubmit={(values, { resetForm }) => {
          if (typeof values.skan_id === "string") delete values.skan_id;
          if (typeof values.skan_person === "string") delete values.skan_person;
          if (typeof values.skan_wallet === "string") delete values.skan_wallet;

          values.name = values.initials.trimLeft().split(' ')[0];
          values.surname = values.initials.trimLeft().split(' ')[1];

          const formData = new FormData();
          for (const [key, value] of Object.entries(values)) {
            formData.append(key, value);
          }

          if (isEdit) {
            handlerUser({ id: values.id, data: formData }).unwrap()
              .then(res => navigate(`/user/${values.id}`));
          } else {
            handlerUser(formData).unwrap()
              .then(res => resetForm());
          }
        }}
      >
        {({ values }) => (
          <Form>
            <div className="user-edit__header">
              <h2 className="user-edit__title title__box">User profile</h2>
              <div className="user-edit__btns">
                <button className="user-edit__btn btn-tr" type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : <>Save <img src={deliveredIcon} alt="icon" /></>}
                </button>
                <button className="user-edit__btn btn-tr" type="button" onClick={() => navigate(-1)}>
                  Cancel <img src={closeIcon} alt="icon" />
                </button>
              </div>
            </div>
            <div className="user__info">
              <div className="user__info-top">
                <div className="user__info-item">
                  <InputField name="initials" label="Initials" />
                  <ErrorMessage className="error-message" name="initials" component="div" />
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Register</h2>
                  <div className="user__info-text">{formateDate(values.date_indentifier)}</div>
                </div>
                <div className="user__info-item">
                  <CheckboxField name="block" label="Block" />
                </div>
                <div className="user__info-item">
                  <InputField name="phone_number" label="Phone number" />
                  <ErrorMessage className="error-message" name="phone_number" component="div" />
                </div>
                <div className="user__info-item">
                  <InputField name="telegram" label="Telegram" />
                </div>
                <div className="user__info-item">
                  <InputField name="email" label="Mail" />
                  <ErrorMessage className="error-message" name="email" component="div" />
                </div>
                <div className="user__info-item">
                  <FileLoaderField name="skan_wallet" label="Income statement" />
                </div>
                <div className="user__info-item">
                  <CheckboxField name="corresponds" label="Verification" />
                </div>
                <div className="user__info-item__wrap">
                  <div className="user__info-item">
                    <h2 className="user__info-title">Deals made</h2>
                    <div className="user__info-text">{values.transaction_count}</div>
                  </div>
                  <div className="user__info-item">
                    <h2 className="user__info-title">Total amount</h2>
                    <div className="user__info-text">{values.total_amount} USD</div>
                  </div>
                </div>
              </div>
              <div className="user__info-body">
                <div className="user__info-section">
                  <div className="user__info-item">
                    <CalendarField name="birth_date" label="Date of birth" />
                  </div>
                  <div className="user__info-item">
                    <InputField name="nationality" label="Nationality" />
                  </div>
                  <div className="user__info-item">
                    <InputField name="place_birth" label="Place and country of birth" />
                  </div>

                  <div className="user__info-item">
                    <SelectField
                      name="gender"
                      label="Gender"
                      options={["Select a gender", "Male", "Female", "Other"]}
                    />
                  </div>
                  <div className="user__info-item">
                    <SelectField
                      name="birth_number"
                      label="Birth number"
                      options={["Select a birth", "Allocated", "Unassigned"]}
                    />
                  </div>
                  <div className="user__info-item">
                    <InputField name="address_residence" label="Exact address and country of residence" />
                  </div>
                </div>
                <div className="user__info-section">
                  <div className="user__info-item">
                    <SelectField
                      name="type_id_card"
                      label="Type of ID card"
                      options={["Select of type", "Passport", "ID card",
                        "Driving licence", "Residence permit", "Other ID"]}
                    />
                  </div>
                  <div className="user__info-item">
                    <InputField name="indetity_card_number" label="Identity card number" />
                  </div>
                  <div className="user__info-item">
                    <InputField name="authority" label="The authority that issued ID" />
                  </div>
                  <div className="user__info-item__combined">
                    <h2 className="user__info-title">Date of validity of ID</h2>
                    <div className="user__info-text">
                      <div className="user__info-text__wrapper">
                        From: <CalendarField name="date_of_validity_from" />
                      </div>
                      <div className="user__info-text__wrapper">
                        Until: <CalendarField name="date_of_validity_until" />
                      </div>
                    </div>
                  </div>
                  <div className="user__info-item">
                    <FileLoaderField name="skan_id" label="Scanned copy of the ID card" />
                  </div>
                  <div className="user__info-item">
                    <CheckboxField name="pep_client" label="Is this person or PEP client?" />
                  </div>
                  <div className="user__info-item">
                    <FileLoaderField name="skan_person" label="Scanned copy PEP" />
                  </div>
                  <div className="user__info-item">
                    <CheckboxField name="sanctions" label="International sanctions" />
                  </div>
                </div>

                <h2 className="user__info-title user__info-title__busines">The client acts as a natural person engaged in business </h2>
                <div className="user__info-section">
                  <div className="user__info-item">
                    <InputField name="business_name" label="Business name" />
                  </div>
                  <div className="user__info-item">
                    <InputField name="address" label="Register office" />
                  </div>
                  <div className="user__info-item">
                    <InputField name="id_number" label="ID" />
                  </div>
                  <div className="user__info-item">
                    <CheckboxField name="country_at_risk" label="Establishment in a country at risk" />
                  </div>
                  <div className="user__info-item__combined">
                    <CheckboxField name="screening_of_the_client" label="Carry out enchanced screening of the client" />
                  </div>
                  <div className="user__info-item_ones">
                    <SelectField
                      name="client_legal_entity"
                      label="The client is a legal entity"
                      options={["Select a choices", "Statutor", "Power of attorney", "Other"]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}

      </Formik>
    </main>
  </>)
}

export default UserForm; // 223