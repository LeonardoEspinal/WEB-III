import { useState, useEffect } from "react";
import axios from "axios";
import Table from "./components/Table";
import CreateUserModal from "./components/modals/CreateUserModal";
import EditUserModal from "./components/modals/EditUserModal";
import DeleteUserModal from "./components/modals/DeleteUserModal";
import "./styles/App.css";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/");
      console.log(res.data);
      setUsers(res.data.users); 
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">BOTONES FUNCIONALES</h1>
      <div className="d-flex justify-content-center gap-3 mb-3">
        <CreateUserModal addUser={addUser} />
        <EditUserModal fetchUsers={fetchUsers} />
        <DeleteUserModal fetchUsers={fetchUsers} />
      </div>
      <Table users={users} />
    </div>
  );
}

export default App;
