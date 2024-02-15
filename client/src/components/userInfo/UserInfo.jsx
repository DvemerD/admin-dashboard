import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import writeIcon from "../../assets/write-icon.svg";
import arrowBackIcon from "../../assets/arrow-back-icon.svg";
import arrowMoreIcon from "../../assets/arrow-more-icon.svg";
import arrowHideIcon from "../../assets/arrow-hide-icon.svg";

import "./userInfo.scss";


const UserInfo = () => {
  const [openInfo, setOpenInfo] = useState(false);
  const [userData, setUserData] = useState([]);
  const { id } = useParams();

  return (
    <div className="user__wrapper">
      <div className="user__header">
        <h1 className="user__title title__box">User profile</h1>
        <div className="user__header-btns">
          <Link to={`/user/${id}/edit`} className="user-info__btn btn-link">
            Edit
            <img src={writeIcon} alt="write" />
          </Link>
          <Link to="/users" className="user-info__btn btn-link">
            Back
            <img src={arrowBackIcon} alt="arrow back" />
          </Link>
        </div>
      </div>
      <div className="user__info">
        <div className="user__info-top">
          <div className="user__info-item">
            <h2 className="user__info-title">Initials</h2>
            <div className="user__info-text">Lorem, ipsum.</div>
          </div>
          <div className="user__info-item">
            <h2 className="user__info-title">Register</h2>
            <div className="user__info-text">12.23.12</div></div>

          <div className="user__info-item">
            <h2 className="user__info-title">Block</h2>
            <div className="user__info-text">no</div>
          </div>

          <div className="user__info-item">
            <h2 className="user__info-title">Phone number</h2>
            <div className="user__info-text">12321321321</div>
          </div>
          <div className="user__info-item">
            <h2 className="user__info-title">Telegramm</h2>
            <div className="user__info-text">@ewqewqewqe</div>
          </div>
          <div className="user__info-item">
            <h2 className="user__info-title">Mail</h2>
            <div className="user__info-text">wqeweqe@gmail.com</div>
          </div>

          <div className="user__info-item">
            <h2 className="user__info-title">Income statement</h2>
            <div className="user__info-text">Open file
              {/* {userData.skan_wallet ?
                <a
                  className="link"
                  href={userData.skan_wallet}
                  target="_blank"
                >Open file</a> : "no"} */}
            </div>
          </div>
          <div className="user__info-item">
            <h2 className="user__info-title">Verification</h2>
            <div className="user__info-text">yes</div>
          </div>
          <div className="user__info-item__wrap">
            <div className="user__info-item">
              <h2 className="user__info-title">Deals made</h2>
              <div className="user__info-text">1223</div>
            </div>
            <div className="user__info-item">
              <h2 className="user__info-title">Total amount</h2>
              <div className="user__info-text">123123 USD</div>
            </div>
          </div>
        </div>
        {openInfo && (<>
          <div className="user__info-body">
            <div className="user__info-section">
              <div className="user__info-item">
                <h2 className="user__info-title">Date of birth</h2>
                <div className="user__info-text">{userData.birth_date ? userData.birth_date.replace(/-/g, ".") : "no"}</div>
              </div>
              <div className="user__info-item">
                <h2 className="user__info-title">Nationality</h2>
                <div className="user__info-text">{userData.nationality || "no"}</div>
              </div>
              <div className="user__info-item">
                <h2 className="user__info-title">Place and country of birth</h2>
                <div className="user__info-text">{userData.place_birth || "no"}</div>
              </div>

              <div className="user__info-item">
                <h2 className="user__info-title">Gender</h2>
                <div className="user__info-text">
                  {userData.gender === "M" && "Male"}
                  {userData.gender === "F" && "Female"}
                  {userData.gender === "O" && "Other"}
                  {!userData.gender && "no"}
                </div>
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
        </>)}
        <button
          className="user__btn user__open-btn"
          onClick={() => setOpenInfo(!openInfo)}
        >
          {openInfo ?
            <>
              Hide
              <img src={arrowHideIcon} alt="hide icon" />
            </> :
            <>
              More
              <img src={arrowMoreIcon} alt="more icon" />
            </>
          }
        </button>
      </div>
    </div>
  )
}

export default UserInfo;