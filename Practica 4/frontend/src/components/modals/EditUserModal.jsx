import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

function EditUserModal({ editUser }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleEditUser = async () => {
    if (!id.trim() || !name.trim() || !email.trim()) {
      toast.error("All fields are required");
      return;
    }
    try {
      const res = await axios.put(`http://localhost:3001/edit/${id}`, {
        name,
        email
      });

      if (res.status === 200) {
        toast.success("User edited successfully");
        editUser({ id, name, email });
        setId("");
        setName("");
        setEmail("");
      }
    } catch (error) {
      console.error("Error editing user", error);
      toast.error("Error al Editar");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#editUserModal"
      >
        <b>EDITAR</b>
      </button>

      <div
        className="modal fade"
        id="editUserModal"
        tabIndex="-1"
        aria-labelledby="EditUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="EditUserModalLabel">
                <b>Edit User (ID, Name, Email)</b>
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
                <label htmlFor="id" className="form-label">ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="Ej: 12"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nuevo Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Ej: Leonardo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Nuevo...</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Ej: lo que sea xd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleEditUser}
                data-bs-dismiss="modal"
              >
                <b>Guardar</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUserModal;
