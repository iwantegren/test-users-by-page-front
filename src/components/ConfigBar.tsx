import { ChangeEvent, useState } from "react";
import config from "../config";

type Props = {
  setUsersKey: React.Dispatch<React.SetStateAction<number>>;
};

export function ConfigBarComponent({ setUsersKey }: Props) {
  const [url, setUrl] = useState(config.backendUrl);

  const backendUrlChanged = (e: ChangeEvent<HTMLInputElement>) => {
    config.backendUrl = e.target.value;
    setUrl(e.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setUsersKey((key) => key + 1);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-secondary bg-gradient">System info</div>
      <div className="card-body">
        <h5>
          Connected to{" "}
          <input
            type="text"
            value={url}
            onChange={backendUrlChanged}
            onKeyUp={handleKeyPress}
            className="form-control"
            style={{ display: "inline", width: "fit-content" }}
          />
        </h5>
      </div>
    </div>
  );
}
