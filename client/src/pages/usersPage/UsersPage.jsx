import { NavLink } from "react-router-dom";
import Search from "../../components/search/Search";
import TableList from "../../components/tableList/TableList";
import { useGetUsersQuery } from "../../redux/api/usersApi";
import UserItem from "../../components/userItem/UserItem";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";

import "./usersPage.scss";

const headerItems = [
  { "dataType": "text-short", "name": "Initials" },
  { "dataType": "text-short", "name": "Register date" },
  { "dataType": "text-short", "name": "Phone number" },
  { "dataType": "text-short", "name": "Contacts" },
  { "dataType": "text-short", "name": "Income statement" },
  { "dataType": "text-short", "name": "Verification" },
  { "dataType": "text-short", "name": "PO" },
];

const UsersPage = () => {
  const { data: users = [], isLoading, isError, error } = useGetUsersQuery();

  return (<>
    {isError && <ErrorNotification error={error} />}
    <main className="users">
      <div className="users__subheader">
        <div className="users__field">
          <Search />
          <NavLink
            to="/user/create"
            className="users__create-btn"
          >
            New user
          </NavLink>
        </div>
      </div>
      <TableList
        headerItems={headerItems}
        data={users.results}
        ComponentsItem={UserItem}
        status={{ isLoading }}
      />
    </main>
  </>);
};

export default UsersPage;