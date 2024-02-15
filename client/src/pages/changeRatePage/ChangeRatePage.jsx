import CreateRate from "../../components/createRate/CreateRate";
import TableList from "../../components/tableList/TableList";
import "./changeRatePage.scss";

const headerItems = [
  { "dataType": "numeric", "name": "Currency" },
  { "dataType": "text-short", "name": "Bank rate" },
  { "dataType": "text-long", "name": "Exchange rate" },
  { "dataType": "text-short", "name": "Markup" },
  { "dataType": "text-short", "name": "Markup 2" },
  { "dataType": "text-short", "name": "Rounding" },
  { "dataType": "text-long", "name": "Image" },
];

const ChangeRatePage = () => {
  return (
    <main className="rate">
      <CreateRate />
      <TableList headerItems={headerItems} />
    </main>
  );
};

export default ChangeRatePage;