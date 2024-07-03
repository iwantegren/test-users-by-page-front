import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createUser, getPositions, getToken } from "../services/apiUtils";
import { CreateUserDto } from "../types/createUserDto";
import { PositionDto } from "../types/positionDto";

function CreateUserComponent() {
  const [formData, setFormData] = useState<CreateUserDto>({
    name: "",
    email: "",
    phone: "",
    position_id: "0",
    file: null,
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [formSuccess, setFormSuccess] = useState<string>("");
  const [positions, setPositions] = useState<PositionDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPositions() {
      try {
        setLoading(true);
        setPositions(await getPositions());
      } catch (error) {
        console.error("Error fetching positions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPositions();
  }, []);

  const formChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const formSelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setFormErrors([]);
    setLoading(true);

    const token = await getToken();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    formData.position_id &&
      data.append("position_id", formData.position_id as string);
    formData.file && data.append("file", formData.file);

    try {
      const result = await createUser(data, token);

      if (result.status === 201) {
        setFormSuccess("User created successfully");
        setTimeout(() => {
          setFormSuccess("");
        }, 3000);
      } else if (result.status === 400) {
        const msg = result.error.message;
        setFormErrors(Array.isArray(msg) ? msg : [msg]);
      } else if (result.status === 409) {
        const msg = result.error.message;
        setFormErrors(Array.isArray(msg) ? msg : [msg]);
      } else {
        alert(
          `Failed to create user\nError ${result.status}: ${JSON.stringify(
            result.error
          )}`
        );
      }
    } catch (error) {
      alert(`Failed to submit form: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-secondary bg-gradient">Create user</div>
      <div className="card-body">
        <form onSubmit={formSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="formName">Name</label>
            <input
              className="form-control"
              id="formName"
              name="name"
              value={formData.name}
              onChange={formChanged}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="formEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="formEmail"
              name="email"
              value={formData.email}
              placeholder="name@example.com"
              onChange={formChanged}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="formPhone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="formPhone"
              name="phone"
              value={formData.phone}
              placeholder="+380XXXXXXXXX"
              onChange={formChanged}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="formPosition">Position</label>
            <select
              className="form-control"
              id="formPosition"
              name="position_id"
              value={formData.position_id}
              onChange={formSelectChanged}
            >
              <option value="">Select a position...</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="formPhoto">Select photo</label>
            <input
              type="file"
              className="form-control-file d-block"
              id="formPhoto"
              name="file"
              onChange={formChanged}
            />
          </div>
          <button
            className="btn btn-primary mb-3"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm mx-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </>
            ) : (
              <>Create User</>
            )}
          </button>
        </form>
        {formSuccess && (
          <div className="alert alert-success" role="alert">
            {formSuccess}
          </div>
        )}
        {formErrors.length > 0 && (
          <div>
            {formErrors.map((err, index) => (
              <div className="alert alert-danger" role="alert" key={index}>
                {err}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateUserComponent;
