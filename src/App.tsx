import "bootstrap/dist/css/bootstrap.min.css";
import CreateUserComponent from "./components/CreateUser";
import UsersPageComponent from "./components/UsersPage";
import { ConfigBarComponent } from "./components/ConfigBar";
import { useState } from "react";

function App() {
  const [usersKey, setUsersKey] = useState(0);

  return (
    <>
      <ConfigBarComponent setUsersKey={setUsersKey} />
      <CreateUserComponent />
      <UsersPageComponent key={usersKey} />
    </>
  );
}

export default App;
