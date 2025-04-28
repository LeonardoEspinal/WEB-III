import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function DeleteUserModal({ deleteUser }) {
  const [id, setId] = useState("");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleDeleteUser = async () => {
    if (!id.trim()) {
      toast.error("All Fields are Required.");
      return;
    }
    try {
      const res = await axios.delete(`http://localhost:3001/delete/${id}`);

      if (res.status === 200) {
        toast.success(`Id ${id} Deleted Successfully`);
        deleteUser(id); 
        setId("");
      }
    } catch (error) {
      console.error("Error Deleting User", error);
      toast.error("Error Al borrar");
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-danger"
        data-bs-toggle="modal"
        id="button"
        data-bs-target="#DeleteUserModal"
      >
        <b>ELIMINAR</b>
      </button>

      <div
        className="modal fade"
        id="DeleteUserModal"
        tabIndex="-1"
        aria-labelledby="DeleteUserModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                <b>Cual desea eliminar?</b>
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
                <label htmlFor="id" className="form-label">
                  Id:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id"
                  placeholder="ej: 12"
                  value={id}
                  onChange={handleIdChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteUser}
                data-bs-dismiss="modal"
              >
                <b>confirmar</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteUserModal;
