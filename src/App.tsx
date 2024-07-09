import "bootstrap/dist/css/bootstrap.min.css";
import CreateUserComponent from "./components/CreateUser";
import UsersPageComponent from "./components/UsersPage";
import config from "./config";

function App() {
  return (
    <>
      <div className="card">
        <div className="card-header bg-secondary bg-gradient">System info</div>
        <div className="card-body">
          <h5>Connected to {config.backendUrl}</h5>
        </div>
      </div>
      <CreateUserComponent />
      <UsersPageComponent />
    </>
  );
}

export default App;
