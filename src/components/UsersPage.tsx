import { useState } from "react";
import { UserComponent } from "./User";

function UsersPageComponent() {
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>("url");

  const users = [
    { id: 1, name: "Ivan" },
    { id: 2, name: "Eva" },
    { id: 3, name: "Ira" },
    { id: 4, name: "Igor" },
  ];

  const clickPrevPage = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setNextPage("url");
    setPrevPage(null);
  };

  const clickNextPage = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setPrevPage("url");
    setNextPage(null);
  };

  return (
    <div className="card">
      <div className="card-header bg-secondary bg-gradient">List ot users</div>
      <div className="card-body">
        <button
          className="btn btn-primary mx-3"
          disabled={prevPage === null}
          onClick={clickPrevPage}
        >
          Prev
        </button>
        <button
          className="btn btn-primary mx-3"
          disabled={nextPage === null}
          onClick={clickNextPage}
        >
          Next
        </button>
        {users.map((user) => (
          <UserComponent key={user.id} user={user} />
        ))}
        <button
          className="btn btn-primary mx-3"
          disabled={prevPage === null}
          onClick={clickPrevPage}
        >
          Prev
        </button>
        <button
          className="btn btn-primary mx-3"
          disabled={nextPage === null}
          onClick={clickNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersPageComponent;
