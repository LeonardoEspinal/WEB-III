import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import EditUserModal from "./modals/EditUserModal";
import CreateUserModal from "./modals/CreateUserModal";
import DeleteUserModal from "./modals/DeleteUserModal";

function Table() {
  const [users, setUsers] = useState([]);
  const hasFetchedUsers = useRef(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001");
      setUsers(response.data);

      if (!hasFetchedUsers.current) {
        toast.success("cargado!");
        hasFetchedUsers.current = true;
      }
    } catch (error) {
      console.error("There was an error fetching the users!", error);

      if (!hasFetchedUsers.current) {
        toast.error("Error en cargar");
        hasFetchedUsers.current = true;
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const editUser = (editedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === parseInt(editedUser.id)
          ? { ...user, name: editedUser.name, email: editedUser.email }
          : user
      )
    );
  };

  const deleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== parseInt(userId)));
  };

  return (
    <>
      <Toaster richColors closeButton />
      <div className="container mt-5">
        <h1 className="mb-4" id="h1">
          User Table
        </h1>
        <CreateUserModal addUser={addUser} />
        <EditUserModal editUser={editUser} />
        <DeleteUserModal deleteUser={deleteUser} />

        {users.length === 0 ? (
          <h3 id="h3">No hay usuarios</h3>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Algo</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Table;
