import { Link, NavLink } from "react-router-dom";
import Search from "../../components/search/Search";
import TableList from "../../components/tableList/TableList";

import "./usersPage.scss";

const headerItems = [
  { "dataType": "text-short", "name": "Initials" },
  { "dataType": "text-short", "name": "Register date" },
  { "dataType": "text-short", "name": "Phone number" },
  { "dataType": "text-long", "name": "Contacts" },
  { "dataType": "text-short", "name": "Income statement" },
  { "dataType": "text-short", "name": "Verification" },
  { "dataType": "text-short", "name": "PO" },
];

const UsersPage = () => {
  return (
    <main className="users">
      <Link to={`/user/1`}>
        Edit
      </Link>
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
      <TableList headerItems={headerItems} />
    </main>
  );
};

export default UsersPage;