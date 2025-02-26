import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleToggleRole = async (email, currentRole) => {
    try {
      if (currentRole === "user") {
        await UserService.makeAdmin(email);
      } else {
        await UserService.makeUser(email);
      }

      // อัปเดต UI โดยเปลี่ยน role ใน state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email
            ? { ...user, role: currentRole === "user" ? "admin" : "user" }
            : user
        )
      );

      Swal.fire({
        icon: "success",
        title: `Role updated successfully!`,
        text: `${email} is now a ${currentRole === "user" ? "Admin" : "User"}.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update role",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const handleDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This user will be deleted permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // ลบผู้ใช้จากฐานข้อมูล
        await UserService.deleteUser(userId);

        // อัปเดต UI โดยการลบผู้ใช้จาก state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete user",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Users</h2>

      {/* แสดงจำนวนผู้ใช้ทั้งหมด */}
      <div className="text-center mb-4">
        <p className="text-lg">
          Total Users: <strong>{users.length}</strong>
        </p>
      </div>

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
                <tr key={user._id} className="text-center">
                  <td>{index + 1}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border flex items-center justify-center">
                    <label className="flex items-center cursor-pointer">
                      <span className="flex items-center mr-2">
                        <FaUsers className="mr-3" />
                        {user.role === "admin" ? "Admin" : "User"}
                      </span>
                      <input
                        type="checkbox"
                        className="toggle toggle-accent"
                        checked={user.role === "admin"}
                        onChange={() => handleToggleRole(user.email, user.role)}
                      />
                    </label>
                  </td>
                  <td className="p-3 border text-center">
                    {/* ปุ่มลบผู้ใช้ */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="h-16">
          <tr className="bg-red text-white rounded-sm text-center">
              <th className="p-3 border">#</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
            </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Index;