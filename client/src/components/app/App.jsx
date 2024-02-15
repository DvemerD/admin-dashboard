import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import NewOrdersPage from "../../pages/newOrdersPage/NewOrdersPage";
import HistoryPage from "../../pages/historyPage/HistoryPage";
import UsersPage from "../../pages/usersPage/UsersPage";
import CommentsPage from "../../pages/commentsPage/CommentsPage";
import ChangeRatePage from "../../pages/changeRatePage/ChangeRatePage";
import UserInfoPage from "../../pages/userInfoPage/UserProfilePage";
import LoginPage from "../../pages/loginPage/LoginPage";
import PrivateRoutes from "../../shared/privateRoutes/PrivateRoutes";


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
              <Route path="/user/:id" element={<UserInfoPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;