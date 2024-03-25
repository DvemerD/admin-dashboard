import { formateDate } from "../../utils/helpers";
import arrowIcon from "../../assets/arrow-icon.svg";
import Menu from "../../shared/menu/Menu";

const TransactionItem = ({ data }) => {
  const { transaction_id, datetime, sold_currency, bought_currency, transaction_rate,
    coin_rate, dollar_rate, sold_amount, bought_amount, market_rate, id, sold,
    fo: { name, surname, email, telegram, phone_number } } = data;

  return (<>
    <tr>
      <td data-title="ID"><div>{transaction_id}</div></td>
      <td data-title="Date & Time">{formateDate(datetime, true)}</td>
      <td data-title="Exchange rate">
        <div>
          {sold_currency}
          <img className="tabele__arrow" src={arrowIcon} alt="arrow left" />
          {bought_currency}
        </div>
        <br />
        <div>
          {+coin_rate}
          <img className="tabele__arrow" src={arrowIcon} alt="arrow left" />
          {+dollar_rate}
        </div>
      </td>
      <td data-title="Trade">
        <div>{+sold_amount}<img className="tabele__arrow" src={arrowIcon} alt="arrow left" />{+bought_amount}</div>
      </td>
      <td data-title="Markup"><div>{`${+market_rate}%(${+transaction_rate} ${bought_currency})`}</div></td>
      <td data-title="Initials"><div>{name}{surname}</div></td>
      <td data-title="Contact">
        <p>
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tg://resolve?domain=${telegram}`}>{telegram}</a>
        </p>
      </td>
      <td data-title="Phone number"><div><a href={`tel:${phone_number}`}>{phone_number}</a></div></td>
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