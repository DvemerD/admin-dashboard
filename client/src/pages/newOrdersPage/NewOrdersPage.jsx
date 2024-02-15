import TableList from "../../components/tableList/TableList";

import "./newOrdersPage.scss";

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

const NewOrdersPage = () => {

  return (
    <main className="new-orders">
      <TableList headerItems={headerItems} />
    </main>
  );
};

export default NewOrdersPage;