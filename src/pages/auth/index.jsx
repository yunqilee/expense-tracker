import { db, auth, provider } from "../../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuth } = useGetUserInfo();

  const navigate = useNavigate();

  const getUserRole = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data().role;
      } else {
        alert("User role not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting user role:", error);
      alert("Error getting user role");
      return null;
    }
  };

  const signUp = async () => {
    try {
      const resp = await createUserWithEmailAndPassword(auth, email, password);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const role = await getUserRole(user.uid);
      switch (role) {
        case "admin":
          window.location.href = "/";
          break;
        case "user":
          window.location.href = "/expense-tracker";
          break;
        default:
          alert("Unknown role:", role);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    const resp = await signInWithPopup(auth, provider);
    const token = await resp.user.getIdToken();
    const authInfo = {
      userID: resp.user.uid,
      name: resp.user.displayName,
      isAuth: true,
      jwt: token,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to={"/expense-tracker"} />;
  }
  return (
    <div className="login-page">
      <input
        placeholder="Email..."
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
      <p>Sign in with Google to continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};
