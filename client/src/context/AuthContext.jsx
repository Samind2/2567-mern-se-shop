//useState = เก็บข้อมูล useEffect = สร้างฟังชั่น
import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
import app from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { Cookies } from "react-cookie";
import UserService from "../services/user.service";

const cookies = new Cookies();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const auth = getAuth(app);

  const getUser = () => {
    const userInfo = cookies.get("user") || null;
    //decode token
    // const saveuser = cookies.get("user");
    return userInfo;
  };
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };

  const signUpWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const signUpWithGithub = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = async (displayName, photoURL) => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName, photoURL });
        // อัปเดตสถานะของผู้ใช้ใน state
        setUser({ ...auth.currentUser, displayName, photoURL });
      } catch (error) {
        console.error("เกิดข้อผิดพลาดขณะอัปเดตโปรไฟล์:", error);
        throw error;
      }
    } else {
      return Promise.reject(new Error("ผู้ใช้ยังไม่ได้เข้าสู่ระบบ"));
    }
  };

  const authInfo = {
    user,
    getUser,
    createUser,
    login,
    logout,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
    updateUserProfile,
    isLoading,
  };
  //check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUser(currentUser);
        setIsLoading(false);
        const { email } = currentUser;
        const { data } = await UserService.signJwt(email);
        if (data) {
          cookies.set("user", data);
        }
      } else {
        cookies.remove("token");
      }
      setIsLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [auth]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
