import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import deliveredIcon from "../../assets/delivered-icon.svg";
import closeIcon from "../../assets/close-icon.svg";
import InputField from "../../shared/inputField/InputField";
import { defaultValidate, formateDate } from "../../utils/helpers";

import "./userEditForm.scss";
import CheckboxField from "../../shared/checkboxField/CheckboxField";
import FileLoaderField from "../../shared/fileLoaderField/FileLoaderField";
import SelectField from "../../shared/selectField/SelectField";

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
          skan_wallet: ''
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
                  <InputField name="birth_date" label="Date of birth" />
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
                    options={["Male", "Female", "Other"]}
                  />
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Birth number</h2>
                  <div className="user__info-text">
                    {userData.birth_number === "A" && "Allocated"}
                    {userData.birth_number === "U" && "Unassigned"}
                    {!userData.birth_number && "no"}
                  </div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Exact address and country of residence</h2>
                  <div className="user__info-text">{userData.address_residence || "no"}</div>
                </div>
              </div>

              <div className="user__info-section">
                <div className="user__info-item">
                  <h2 className="user__info-title">Type of ID card</h2>
                  <div className="user__info-text">
                    {userData.type_id_card === "P" && "Passport"}
                    {userData.type_id_card === "I" && "ID card"}
                    {userData.type_id_card === "D" && "Driving licence"}
                    {userData.type_id_card === "R" && "Residence permit"}
                    {userData.type_id_card === "O" && "Other ID"}
                    {!userData.type_id_card && "no"}
                  </div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Identity card number</h2>
                  <div className="user__info-text">{userData.indetity_card_number || "no"}</div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">The authority that issued ID</h2>
                  <div className="user__info-text">{userData.authority || "no"}</div>
                </div>
                <div className="user__info-item__combined">
                  <h2 className="user__info-title">Date of validity of ID</h2>
                  <div className="user__info-text">
                    <div className="user__info-text__wrapper">From: {userData.date_of_validity_from ?
                      userData.date_of_validity_from.replace(/-/g, ".") : "no"} </div>
                    <div className="user__info-text__wrapper">Until: {
                      userData.date_of_validity_until ?
                        userData.date_of_validity_until.replace(/-/g, ".") : "no"}</div>
                  </div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Scanned copy of the ID card</h2>
                  <div className="user__info-text">
                    <div className="user__info-text">{userData.skan_id ?
                      <a
                        className="link"
                        href={userData.skan_id}
                        target="_blank"
                        rel="noopener noreferrer"
                      >Open file</a> : "no"}
                    </div>
                  </div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Is this person or PEP client?</h2>
                  <div className="user__info-text">{userData.pep_client ? "yes" : "no"}*</div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Scanned copy PEP</h2>
                  <div className="user__info-text">{userData.skan_person ?
                    <a
                      className="link"
                      href={userData.skan_person}
                      target="_blank"
                    >Open file</a> : "no"}
                  </div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">International sanctions</h2>
                  <div className="user__info-text">{userData.sanctions ? "yes" : "no"}*</div>
                </div>
              </div>

              <h2 className="user__info-title user__info-title__busines">The client acts as a natural person engaged in business </h2>
              <div className="user__info-section">
                <div className="user__info-item__combined">
                  <h2 className="user__info-title">Business name</h2>
                  <div className="user__info-text">{userData.client_acts ? userData.client_acts.business_name : "no"}</div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Register office</h2>
                  <div className="user__info-text">{userData.client_acts ? userData.client_acts.address : "no"}</div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">ID</h2>
                  <div className="user__info-text">{userData.client_acts ? userData.client_acts.id_number : "no"}</div>
                </div>
                <div className="user__info-item">
                  <h2 className="user__info-title">Establishment in a country at risk</h2>
                  <div className="user__info-text">{userData.client_acts ? (userData.client_acts.country_at_risk && "yes") : "no"}</div>
                </div>
                <div className="user__info-item__combined">
                  <h2 className="user__info-title">Carry out enchanced screening of the client</h2>
                  <div className="user__info-text">{userData.client_acts ? (userData.client_acts.country_at_risk && "yes") : "no"}</div>
                </div>
                <div className="user__info-item_ones">
                  <h2 className="user__info-title">The client is a legal entity</h2>
                  <div className="user__info-text">
                    {userData.client_legal_entity === "S" && "Statutor"}
                    {userData.client_legal_entity === "P" && "Power of attorney"}
                    {userData.client_legal_entity === "O" && "Other"}
                    {!userData.client_legal_entity && "no"}
                  </div>
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