import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import deliveredIcon from "../../assets/delivered-icon.svg";
import closeIcon from "../../assets/close-icon.svg";
import InputField from "../../shared/inputField/InputField";
import CheckboxField from "../../shared/checkboxField/CheckboxField";
import FileLoaderField from "../../shared/fileLoaderField/FileLoaderField";
import SelectField from "../../shared/selectField/SelectField";
import CalendarField from "../../shared/calendarField/CalendarField";
import { formateDate } from "../../utils/helpers";

import "./userEditForm.scss";

const userData = {};

const UserEditForm = () => {
  const navigate = useNavigate();

  return (
    <main className="user-edit">
      <Formik
        initialValues={{
          initials: 'text',
          block: false,
          phone_number: '',
          telegram: '',
          email: '',
          corresponds: false,
          skan_wallet: '',
          skan_id: '',
          skan_person: '',
        }}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form>
          <div className="user-edit__header">
            <h2 className="user-edit__title title__box">User profile</h2>
            <div className="user-edit__btns">
              <button className="user-edit__btn btn-tr" type="submit">
                Save <img src={deliveredIcon} alt="icon" />
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
              </div>
              <div className="user__info-item">
                <h2 className="user__info-title">Register</h2>
                <div className="user__info-text">{formateDate(userData.date_indentifier, true)}</div>
              </div>
              <div className="user__info-item">
                <CheckboxField name="block" label="Block" />
              </div>
              <div className="user__info-item">
                <InputField name="phone_number" label="Phone number" />
              </div>
              <div className="user__info-item">
                <InputField name="telegram" label="Telegram" />
              </div>
              <div className="user__info-item">
                <InputField name="email" label="Mail" />
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
                  <div className="user__info-text">{userData.transaction_count}</div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Total amount</h2>
                  <div className="user__info-text">{userData.total_amount} USD</div>
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
      </Formik>
    </main>
  )
}

export default UserEditForm; // 223