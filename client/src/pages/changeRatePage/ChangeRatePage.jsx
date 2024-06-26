import CreateRate from "../../components/createRate/CreateRate";
import RateItem from "../../components/rateItem/RateItem";
import TableList from "../../components/tableList/TableList";
import { useGetRatesQuery } from "../../redux/api/ratesApi";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";

import "./changeRatePage.scss";

const headerItems = [
  { "dataType": "numeric", "name": "ID" },
  { "dataType": "text-short", "name": "Currency" },
  { "dataType": "text-long", "name": "Bank rate" },
  { "dataType": "text-short", "name": "Markup" },
  { "dataType": "text-short", "name": "Markup 2" },
  { "dataType": "text-short", "name": "Rounding" },
  { "dataType": "text-short", "name": "Hidden" },
  { "dataType": "text-short", "name": "Image" },
];

const ChangeRatePage = () => {
  const { data: rates = [], isLoading, isError, error } = useGetRatesQuery();

  return (<>
    {isError && <ErrorNotification error={error} />}
    <main className="rate">
      <CreateRate />
      <TableList
        headerItems={headerItems}
        data={rates}
        ComponentsItem={RateItem}
        status={{ isLoading }}
      />
    </main>
  </>);
};

export default ChangeRatePage;