import UserForm from "../../components/userForm/UserForm";
import { useCreateUserMutation } from "../../redux/api/usersApi";


const UserCreatePage = () => {
  const [createUser, status] = useCreateUserMutation();

  return (<>
    <UserForm handlerUser={createUser} status={status}/>
  </>)
}

export default UserCreatePage;