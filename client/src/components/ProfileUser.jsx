import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // ต้องมั่นใจว่า AuthContext มีข้อมูลผู้ใช้
import { useNavigate } from 'react-router-dom';

const ProfileUser = () => {
 const { user } = useContext(AuthContext); // ดึงข้อมูลผู้ใช้จาก AuthContext
 const navigate = useNavigate(); // Hook สำหรับการนำทาง

 const handleEditProfile = () => {
  navigate('/UpdateProfile'); // ใช้เส้นทางที่ตรงกับ router
 };

 const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // สำหรับตัวอย่างนี้ เราจะใช้ URL.createObjectURL เพื่อแสดงตัวอย่างภาพก่อนการอัพโหลด
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // หากคุณต้องการอัพโหลดไฟล์ไปยังเซิร์ฟเวอร์ สามารถทำได้ที่นี่
      // คุณสามารถส่งไปยัง API สำหรับอัพโหลดภาพ
      // เช่น การใช้ API อัพโหลดภาพและอัปเดตข้อมูลใน AuthContext
    }
  };

  const handleSaveProfilePicture = () => {
    // ฟังก์ชั่นนี้จะเรียกใช้งาน API เพื่อบันทึกภาพที่เลือก
    // หากการอัพโหลดสำเร็จ คุณสามารถอัปเดต user.photoURL ด้วย URL ใหม่จากการอัพโหลด
    if (image) {
      // อัพเดตข้อมูลใน AuthContext
      setUser((prevUser) => ({
        ...prevUser,
        photoURL: image,
      }));

      // updateUserProfileImage(image); // ฟังก์ชันที่คุณต้องเรียกเพื่ออัปเดตข้อมูลในฐานข้อมูล
    }
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
