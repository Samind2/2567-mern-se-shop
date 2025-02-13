import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
 const { user, isLoading } = useContext(AuthContext); //ใช้ useContext ให้ถูกต้อง

 if (isLoading) {
  return <div>Loading...</div>; // แสดงข้อความหรือ UI ขณะรอโหลดข้อมูล
 }

 if (!user) {
  return <Navigate to="/signin" />; // ถ้าไม่ล็อกอิน ให้เด้งไปหน้า Signin
 }

 return children; // ถ้าล็อกอินแล้ว ให้แสดงเนื้อหาปกติ
};


export default ProtectedRoute;
