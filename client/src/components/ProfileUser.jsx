import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // ต้องมั่นใจว่า AuthContext มีข้อมูลผู้ใช้
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
 const { user } = useContext(AuthContext); // ดึงข้อมูลผู้ใช้จาก AuthContext
 const navigate = useNavigate(); // Hook สำหรับการนำทาง

 const handleEditProfile = () => {
  navigate('/UpdateProfile'); // ใช้เส้นทางที่ตรงกับ router
 };

 return (
  <div className="card card-side bg-base-100 shadow-xl">
   <figure>
    <img
     src={user?.photoURL || 'https://via.placeholder.com/150'} // ใช้รูปโปรไฟล์ผู้ใช้ ถ้าไม่มีให้ใช้ Placeholder
     alt="Profile"
    />
   </figure>
   <div className="card-body">
    <h2 className="card-title">{user?.displayName || 'ชื่อผู้ใช้'}</h2> {/* แสดงชื่อผู้ใช้ */}
    <p>{user?.email || 'อีเมลไม่ระบุ'}</p> {/* แสดงอีเมล */}
    <div className="card-action justify-between items-center mt-2">
     <button className="btn bg-red text-white" onClick={handleEditProfile}>
      แก้ไขโปรไฟล์
     </button> {/* ปุ่มแก้ไขโปรไฟล์ */}
    </div>
   </div>
  </div>
 );
};

export default ProfileUser;
