import { useNavigate } from "react-router-dom";
import { formateDate } from "../../utils/helpers";
import moreIcon from "../../assets/more-icon.svg";

const UserItem = ({ data }) => {
  const { id, name, surname, phone_number, email, telegram,
    corresponds, skan_wallet, date_indentifier } = data;
  let navigate = useNavigate();

  return (<>
    <tr onClick={() => navigate(`/user/${id}`)}>
      <td data-title="Initials"><div>{name} {surname}</div></td>
      <td data-title="Register date">{formateDate(date_indentifier)}</td>
      <td data-title="Phone number"><div><a href={`tel:${phone_number}`}>{phone_number}</a></div></td>
      <td data-title="Contact">
        <a href={`mailto:${email}`}>{email}</a>
        <br />
        <a href={`tg://resolve?domain=${telegram}`}>{telegram}</a>
      </td>
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