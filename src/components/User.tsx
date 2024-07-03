import { ReadUserDto } from "../types/readUserDto";

type UserProps = {
  user: ReadUserDto;
};

export function UserComponent(props: UserProps) {
  const { user } = props;

  return (
    <div className="card my-3">
      <img
        className="card-img-top mx-3 my-3"
        src={user.photo}
        alt="Profile photo"
        style={{ width: "70px", height: "70px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <h6 className="card-text">{user.position}</h6>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">email: {user.email}</li>
        <li className="list-group-item">phone: {user.phone}</li>
      </ul>
    </div>
  );
}
