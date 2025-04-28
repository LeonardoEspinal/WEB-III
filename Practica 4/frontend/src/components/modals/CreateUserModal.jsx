import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

function CreateUserModal({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateUser = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3001/create", { name, email });

      if (res.status === 201) {
        addUser(res.data);
        toast.success("User created successfully");
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Error creating user");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#CreateUserModal"
      >
        <b>CREAR</b>
      </button>

      <div
        className="modal fade"
        id="CreateUserModal"
        tabIndex="-1"
        aria-labelledby="CreateUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="CreateUserModalLabel">
                <b>Ingresar nuevos datos...</b>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Ex: Leonardo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Algo...</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ej: Algo xd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleCreateUser}
                data-bs-dismiss="modal"
              >
                <b>Crear</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateUserModal;
