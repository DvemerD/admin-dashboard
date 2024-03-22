import { formateDate } from "../../utils/helpers";
import arrowIcon from "../../assets/arrow-icon.svg";
import Menu from "../../shared/menu/Menu";
import { useGetFactureQuery } from "../../redux/api/ordersApi";

const TransactionItem = ({ data }) => {
  const { transaction_id, datetime, sold_currency, bought_currency, transaction_rate,
    coin_rate, dollar_rate, sold_amount, bought_amount, market_rate, id, sold,
    fo: { name, surname, email, telegram, phone_number } } = data;
  // const [getFacture, { error, isLoading }] = useGetFactureQuery();

  return (<>
    <tr>
      <td data-title="ID">{transaction_id}</td>
      <td data-title="Date & Time">{formateDate(datetime, true)}</td>
      <td data-title="Exchange rate">
        <div>{sold_currency}<img className="tabele__arrow" src={arrowIcon} alt="arrow left" />{bought_currency}</div>
        <br />
        <div>{+coin_rate}<img className="tabele__arrow" src={arrowIcon} alt="arrow left" />{+dollar_rate}</div>
      </td>
      <td data-title="Trade">
        <div>{+sold_amount}<img className="tabele__arrow" src={arrowIcon} alt="arrow left" />{+bought_amount}</div>
      </td>
      <td data-title="Markup">{`${+market_rate}%(${+transaction_rate} ${bought_currency})`}</td>
      <td data-title="Initials">{name}{surname}</td>
      <td data-title="Contact">
        <a href={`mailto:${email}`}>{email}</a>
        <br />
        <a href={`tg://resolve?domain=${telegram}`}>{telegram}</a>
      </td>
      <td data-title="Phone number"><a href={`tel:${phone_number}`}>{phone_number}</a></td>
      <td className="table__more">
        <Menu
          items={[
            { name: "Show facture", onClick: () => console.log('yo') }
          ]} status={{ isLoading: false }} />
      </td>
    </tr>
  </>)
}

export default TransactionItem;