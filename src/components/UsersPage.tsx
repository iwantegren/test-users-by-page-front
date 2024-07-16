import { useEffect, useState } from "react";
import { UserComponent } from "./User";
import { ReadUserDto } from "../types/readUserDto";
import { createPageLink, getUsers } from "../services/apiUtils";

function UsersPageComponent() {
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>("url");

  const [error, setError] = useState("");

  const [pages, setPages] = useState<number[]>([1]);
  const count = 6;

  const [users, setUsers] = useState<ReadUserDto[]>([]);

  const [loading, setLoading] = useState(false);

  const loadUsers = async (link: string) => {
    try {
      setLoading(true);

      const result = await getUsers(link);
      setUsers(result.users);
      setNextPage(result.links.next_url);
      setPrevPage(result.links.prev_url);
      setPages([result.page]);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const appendUsers = async (link: string) => {
    try {
      setLoading(true);

      const result = await getUsers(link);
      setUsers((prevUsers) => [...prevUsers, ...result.users]);
      setNextPage(result.links.next_url);
      setPages((prevPages) => [...prevPages, result.page]);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers(createPageLink(pages[pages.length - 1], count));
  }, []);

  const clickPrevPage = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (!prevPage) {
      console.error(`Wrong prevPage: ${prevPage}`);
      return;
    }
    loadUsers(prevPage);
  };

  const clickNextPage = (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (!nextPage) {
      console.error(`Wrong nextPage: ${nextPage}`);
      return;
    }
    loadUsers(nextPage);
  };

  const clickShowMore = (_e: React.MouseEvent<HTMLButtonElement>) => {
    if (!nextPage) {
      console.error(`Wrong nextPage: ${nextPage}`);
      return;
    }
    appendUsers(nextPage);
  };

  return (
    <div className="card">
      <div className="card-header bg-secondary bg-gradient">List ot users</div>
      <div className="card-body">
        <button
          className="btn btn-primary"
          disabled={loading || prevPage === null}
          onClick={clickPrevPage}
        >
          Prev
        </button>
        <button
          className="btn btn-primary mx-3"
          disabled={loading || nextPage === null}
          onClick={clickNextPage}
        >
          Next
        </button>
        {pages.length === 1 ? (
          <h5 className="my-3">Page: {pages[pages.length - 1]}</h5>
        ) : (
          <h5 className="my-3">
            Pages: {pages[0]}-{pages[pages.length - 1]}
          </h5>
        )}
        <h5 className="my-3">Users on the page: {users.length}</h5>
        {users.map((user) => (
          <UserComponent key={user.id} user={user} />
        ))}
        {pages.length === 1 ? (
          <h5 className="my-3">Page: {pages[pages.length - 1]}</h5>
        ) : (
          <h5 className="my-3">
            Pages: {pages[0]}-{pages[pages.length - 1]}
          </h5>
        )}
        <h5 className="my-3">Users on the page: {users.length}</h5>
        {loading && (
          <div className="alert alert-info" role="alert">
            Loading...
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="my-3">
          <button
            className="btn btn-primary"
            disabled={loading || nextPage === null}
            onClick={clickShowMore}
          >
            Show more
          </button>
        </div>
        <button
          className="btn btn-primary"
          disabled={loading || prevPage === null}
          onClick={clickPrevPage}
        >
          Prev
        </button>
        <button
          className="btn btn-primary mx-3"
          disabled={loading || nextPage === null}
          onClick={clickNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UsersPageComponent;
