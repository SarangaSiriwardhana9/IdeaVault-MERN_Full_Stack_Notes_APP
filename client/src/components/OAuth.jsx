// eslint-disable-next-line no-unused-vars

import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import '../Font.css'

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      //create responce
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate('/');
      
    } catch (error) {
      console.log("could not login with google", error);
    }
  };

  return (
    /* button for google login */
    <div>
      <button
        type='button'
        onClick={handleGoogleLogin}
        className='w-full my-text my-3 items-center justify-center  flex flex-row bg-[#fcf18e]   font-bold text-slate-600 py-2 px-4 rounded-md hover:opacity-95 hover:bg-[#c4b852] focus:outline-nonerounded-full'
      >
        <FcGoogle className="mt-1 text-xl mr-2" />
        Sign In with Google
      </button>
    </div>
  );
}
