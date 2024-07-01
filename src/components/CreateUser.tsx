import { ChangeEvent, FormEvent, useState } from "react";

type CreateUserDto = {
  name: string;
  email: string;
  phone: string;
  position: string;
  file: File | null;
};

function CreateUserComponent() {
  const [formData, setFormData] = useState<CreateUserDto>({
    name: "",
    email: "",
    phone: "",
    position: "",
    file: null,
  });

  const formChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    console.log({ name });
    console.log({ value });
    console.log({ files });

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const formSelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    console.log({ name });
    console.log({ value });

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("position", formData.position);
    if (formData.file) {
      formDataToSend.append("file", formData.file);
    }

    console.log({ formData });
    console.log({ formDataToSend });
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
              name="position"
              value={formData.position}
              onChange={formSelectChanged}
            >
              <option>Select a position...</option>
              <option value="1">Job1</option>
              <option value="2">Job2</option>
              <option value="3">Job3</option>
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
          <button type="submit" className="btn btn-primary">
            Create user
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUserComponent;
