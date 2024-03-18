import CreateRate from "../../components/createRate/CreateRate";
import RateItem from "../../components/rateItem/RateItem";
import TableList from "../../components/tableList/TableList";
import { useGetRatesQuery } from "../../redux/api/ratesApi";

import "./changeRatePage.scss";

const headerItems = [
  { "dataType": "numeric", "name": "ID" },
  { "dataType": "text-long", "name": "Currency" },
  { "dataType": "text-long", "name": "Bank rate" },
  { "dataType": "text-short", "name": "Markup" },
  { "dataType": "text-short", "name": "Markup 2" },
  { "dataType": "text-short", "name": "Rounding" },
  { "dataType": "text-short", "name": "Hidden" },
  { "dataType": "text-long", "name": "Image" },
];

const ChangeRatePage = () => {
  const { data: rates = [], isLoading, isError, error } = useGetRatesQuery();

  return (
    <main className="rate">
      <CreateRate />
      <TableList
        headerItems={headerItems}
        data={rates}
        ComponentsItem={RateItem}
        status={{ isLoading, isError, error }}
      />
    </main>
  );
};

export default ChangeRatePage;