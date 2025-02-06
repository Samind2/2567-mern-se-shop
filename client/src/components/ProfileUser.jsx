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
  <div className="flex justify-center items-center min-h-screen">
   <div className="card w-96 bg-base-100 shadow-xl text-center">
    <figure className="px-10 pt-10">
     <img
      src={user?.photoURL || 'https://via.placeholder.com/150'}
      alt="Profile"
      className="w-24 h-24 rounded-full object-cover"
     />
    </figure>
    <div className="card-body items-center">
     <h2 className="card-title text-lg">{user?.displayName || 'ชื่อผู้ใช้'}</h2>
     <p className="text-sm text-gray-500">{user?.email || 'อีเมลไม่ระบุ'}</p>
     <button className="btn bg-red text-white px-4 py-2 rounded-md mt-3" onClick={handleEditProfile}>
      แก้ไขโปรไฟล์
     </button>
    </div>
   </div>
  </div>
 );
};

export default ProfileUser;
