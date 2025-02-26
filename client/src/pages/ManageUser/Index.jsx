import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service"; // เปลี่ยนเป็น UserService ที่เหมาะสม
import { FaTrash } from "react-icons/fa"; // ใช้ไอคอนจาก react-icons

const ManageUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getAllUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const toggleRole = (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const updatedUsers = users.map((user) =>
      user._id === id ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);

    // Updated to include the role in the request body
    UserService.updateUser(id, { role: newRole }) // Pass object with 'role'
      .catch((error) => {
        console.error("Error updating role:", error);
      });
  };

  const deleteUser = (id) => {
    // Send DELETE request
    UserService.deleteUser(id)
      .then(() => {
        // Remove the user from the state after successful deletion
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl text-red font-bold text-center mb-6">
        Manage Users
      </h2>

      {/* แสดงจำนวนผู้ใช้ */}
      <p className="text-center mb-4">Total Users: {users.length}</p>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-red text-white rounded-sm text-center">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-3">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td className="p-3 border text-center">{index + 1}</td>
                  <td className="p-3 border text-center">{user.email}</td>
                  <td className="p-3 border text-center">
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">
                          {user.role === "admin" ? "Admin" : "User"}
                        </span>
                        <input
                          type="checkbox"
                          className="toggle toggle-accent"
                          checked={user.role === "admin"}
                          onChange={() => toggleRole(user._id, user.role)} // เปลี่ยน role เมื่อ toggle
                        />
                      </label>
                    </div>
                  </td>
                  <td className="p-3 border text-center">
                    {/* ปุ่มลบผู้ใช้ */}
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
