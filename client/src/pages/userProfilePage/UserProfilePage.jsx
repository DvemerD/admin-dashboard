import { useParams } from "react-router-dom";
import CreateTransaction from "../../components/createTransaction/CreateTransaction";
import TableList from "../../components/tableList/TableList";
import UserInfo from "../../components/userInfo/UserInfo";
import { useGetUserTransactionsQuery } from "../../redux/api/usersApi";
import TransactionItem from "../../components/transactionItem/TransactionItem";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";

import "./userProfilePage.scss";

const headerItems = [
  { "dataType": "numeric", "name": "ID" },
  { "dataType": "text-short", "name": "Date & Time" },
  { "dataType": "text-short", "name": "Exchange rate" },
  { "dataType": "text-short", "name": "Trade" },
  { "dataType": "text-short", "name": "Markup" },
  { "dataType": "text-short", "name": "Initials" },
  { "dataType": "text-long", "name": "Contact" },
  { "dataType": "text-short", "name": "Phone number" },
];

const UserProfilePage = () => {
  const { id } = useParams();
  const { data: orders = [], isLoading, isError, error } = useGetUserTransactionsQuery(id);

  return (<>
    {isError && <ErrorNotification error={error} />}
    <main className="user">
      <UserInfo />
      <CreateTransaction />
      <TableList headerItems={headerItems} data={orders.results}
        status={{ isLoading }} ComponentsItem={TransactionItem} />
    </main>
  </>)
}

export default UserProfilePage;