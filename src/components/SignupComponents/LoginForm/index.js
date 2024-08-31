import { doc, getDoc } from "firebase/firestore";
import Button from "../../common/Button";
import InputComponent from "../../common/Input";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    console.log("handle Login");
    setLoading(true);

    if(email && password){

        try {
            // createing user accounts
            const userCredentail = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            const user = userCredentail.user;
      
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            console.log("userdata", userData);
      
            dispatch(
              setUser({
                name: userData.name,
                email: user.email,
                uid: user.uid,
                // profilePic: userData.profilePic,
              })
            );
      
            toast.success("User Login Successful")
            setLoading(false);
            navigate("/profile");
            // navigate to the  profil page
        } catch (error) {
            console.error("Error Signing In:", error);
            setLoading(false);
            toast.error(error.message);
          }

        }
    else{
        toast.error("Make Sure Email and Password are not empty");
        setLoading(false);
    }

  
    
    //     // throw an error
  };

  return (
    <>
      <InputComponent
        state={email}
        placeholder="Email"
        type="text"
        setState={setEmail}
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />

      <Button
        text={loading ? "Loading..." : "Login"}
        disabled={loading}
        onClick={handleLogin}
      />
    </>
  );
}

export default LoginForm;
