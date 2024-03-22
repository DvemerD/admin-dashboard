import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewOrdersPage from "../../pages/newOrdersPage/NewOrdersPage";
import HistoryPage from "../../pages/historyPage/HistoryPage";
import UsersPage from "../../pages/usersPage/UsersPage";
import CommentsPage from "../../pages/commentsPage/CommentsPage";
import ChangeRatePage from "../../pages/changeRatePage/ChangeRatePage";
import UserProfilePage from "../../pages/userProfilePage/UserProfilePage";
import LoginPage from "../../pages/loginPage/LoginPage";
import PrivateRoutes from "../../shared/privateRoutes/PrivateRoutes";
import UserEditPage from "../../pages/userEditPage/UserEditPage";
import UserCreatePage from "../../pages/userCreatePage/UserCreatePage";


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="container">
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route exact path="/" element={<NewOrdersPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/comments" element={<CommentsPage />} />
              <Route path="/change-rate" element={<ChangeRatePage />} />
              <Route path="/user/:id" element={<UserProfilePage />} />
              <Route path="/user/:id/edit" element={<UserEditPage />} />
              <Route path="/user/create" element={<UserCreatePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;