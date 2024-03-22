import { useParams } from "react-router-dom";
import { useEditUserInfoMutation, useGetUserInfoQuery } from "../../redux/api/usersApi";
import UserForm from "../../components/userForm/UserForm";
import ErrorNotification from "../../shared/errorNotification/ErrorNotification";

import "./userEditPage.scss";
import Spinner from "../../shared/spinner/Spinner";

const UserEditPage = () => {
  const { id } = useParams();
  const { data: userData = {}, isLoading, isError, error } = useGetUserInfoQuery(id);
  const [editUserInfo, status] = useEditUserInfoMutation();

  return (<>
    {isError && <ErrorNotification error={error} />}
    {isLoading ? <Spinner /> :
      <UserForm
        handlerUser={editUserInfo}
        status={status}
        initialsValues={{ ...userData, initials: `${userData.name || ''} ${userData.surname || ''}` }}
        isEdit={true}
      />
    }
  </>)
}

export default UserEditPage;