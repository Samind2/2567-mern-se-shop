import React from 'react'
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";

const SocailLogin = () => {
 const { signUpWithGoogle, signUpWithGithub, signUpWithFacebook } = useContext(AuthContext);  // ใช้ฟังก์ชันจาก context ที่จัดการการเข้าสู่ระบบด้วย Google และ Github
 const navigate = useNavigate();
 const location = useLocation();
 const from = location?.state?.from?.pathname || "/";

 const GoogleSignUp = () => {
  signUpWithGoogle().then((result) => {
   const user = result.user;
   console.log(user);
   Swal.fire({
    icon: "success",
    title: "GoogleSignUp Successfully",
    showConfirmButton: false,
    timer: 1500,
   });
   document.getElementById("login").close();
   navigate(from, { replace: true });
  })
   .catch((error) => {
    console.log(error);
   });
 };

 const FacebookSignUp = () => {
  signUpWithFacebook().then((result) => {
   const user = result.user;
   console.log(user);
   Swal.fire({
    icon: "success",
    title: "GoogleSignUp Successfully",
    showConfirmButton: false,
    timer: 1500,
   });
   document.getElementById("login").close();
   navigate(from, { replace: true });
  })
   .catch((error) => {
    console.log(error);
   });
 };

 const GithubSignUp = () => {
  signUpWithGithub().then((result) => {
   const user = result.user;
   console.log(user);
   Swal.fire({
    icon: "success",
    title: "GoogleSignUp Successfully",
    showConfirmButton: false,
    timer: 1500,
   });
   document.getElementById("login").close();
   navigate(from, { replace: true });
  })
   .catch((error) => {
    console.log(error);
   });
 };
 return (
  <div className="text-center space-x-3 mb-5">
   <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
    <FaGoogle className="w-6 h-6" onClick={GoogleSignUp} />
   </button>
   <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
    <FaGithub className="w-6 h-6" onClick={GithubSignUp} />
   </button>
   <button className="btn btn-ghost btn-circle hover:bg-red hover:text-white">
    <FaFacebook className="w-6 h-6" onClick={FacebookSignUp} />
   </button>
  </div>
 )
}

export default SocailLogin