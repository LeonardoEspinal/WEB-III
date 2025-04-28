import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

function Table() {
  const [users, setUsers] = useState([]);
  const hasFetchedUsers = useRef(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001");
      setUsers(response.data);

      if (!hasFetchedUsers.current) {
        toast.success("¡Cargado!");
        hasFetchedUsers.current = true;
      }
    } catch (error) {
      console.error("There was an error fetching the users!", error);

      if (!hasFetchedUsers.current) {
        toast.error("Error al cargar usuarios");
        hasFetchedUsers.current = true;
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Toaster richColors closeButton />
      <div className="container mt-5">
        <h1 className="mb-4" id="h1">
          Tabla de usuarios
        </h1>

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
