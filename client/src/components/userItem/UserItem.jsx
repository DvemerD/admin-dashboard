import { useNavigate } from "react-router-dom";
import { formateDate } from "../../utils/helpers";
import moreIcon from "../../assets/more-icon.svg";

const UserItem = ({ data }) => {
  const { id, name, surname, phone_number, email, telegram,
    corresponds, skan_wallet, date_indentifier } = data;
  let navigate = useNavigate();

  return (<>
    <tr onClick={() => navigate(`/user/${id}`)}>
      <td data-title="Initials">{name} {surname}</td>
      <td data-title="Register date">{formateDate(date_indentifier)}</td>
      <td data-title="Phone number">{phone_number}</td>
      <td data-title="Contacts">{email} <br /> {telegram}</td>
      <td data-title="Income statement">{skan_wallet ? 'yes' : 'no'}</td>
      <td data-title="Verification">{corresponds ? 'yes' : 'no'}</td>
      <td data-title="PO">no</td>
      <td className="table__more">
        <img src={moreIcon} alt="more" />
      </td>
    </tr>
  </>)
}

export default UserItem;