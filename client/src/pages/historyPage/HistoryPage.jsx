import { useState } from "react";
import { useGetHistoryOrdersQuery } from "../../redux/api/ordersApi";
import Filters from "../../components/filters/Filters";
import Search from "../../components/search/Search";
import TableList from "../../components/tableList/TableList";
import filtersIcon from "../../assets/filters-icon.svg";

import "./historyPage.scss";

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


const HistoryPage = () => {
  const {
    data: orders = [], isLoading, isError, error} = useGetHistoryOrdersQuery();
  const [openFilters, setOpenFilters] = useState(false);
  console.log(orders);
  return (
    <main className="history">
      <div className="history__subheader">
        <div className="history__field">
          <button className="history__btn filters__btn-open"
            onClick={() => setOpenFilters(prevValue => !prevValue)}
          >
            <img className="filters__btn-open__icon" src={filtersIcon} alt="filters icon" />
            <span>Filters</span>
          </button>
          <Search />
        </div>
        <Filters openFilters={openFilters} />
      </div>
      <TableList headerItems={headerItems} />
    </main>
  );
};

export default HistoryPage;