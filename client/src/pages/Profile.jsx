/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import '../Font.css'
import Loader from '../components/Loader'

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure} from "../redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
 
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePresent, setImagePresent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false)


  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePresent(Math.round(progress));
      },
      // eslint-disable-next-line no-unused-vars
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
      } else {
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true)
      }
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  }

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

console.log(currentUser)
  return (
    <div className='flex justify-center  items-center h-screen bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7]'>
      <div className='bg-white my-4  p-8 rounded-3xl shadow-2xl w-full max-w-md'>
        <h1 className='my-text text-3xl font-extrabold text-center mb-6 text-[#a89a49]'>
          My  Profile
        </h1>
        {loading && <Loader />} {/* Show loader while loading data */}
        <form onSubmit={handleSubmit} className='mb-8'>
          <div className='flex justify-center items-center mb-6'>
            {/* Firebase Storage rules
              allow read;
              allow write: if
              request.resource.size<2*1024*1024 &&
              request.resource.contentType.matches('image/.*')
            */}
            <input
              type='file'
              ref={fileRef}
              accept='image/*'
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt='profile'
              className='rounded-full w-24 h-24 cursor-pointer object-cover'
              onClick={() => fileRef.current.click()}
            />
          </div>
          <div className='mb-4'>
            <p className='text-sm text-center self-center'>
              {imageError ? (
                <span className='text-red-700'>
                  Error uploading image (file size must be less than 2 MB)
                </span>
              ) : imagePresent > 0 && imagePresent < 100 ? (
                <span className='text-[#686333]'>{`Uploading: ${imagePresent} %`}</span>
              ) : imagePresent === 100 ? (
                <span className='text-[#686333]'>
                  Image uploaded successfully
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className='mb-4'>
            <input
              type='text'
              id='username'
              placeholder='Username'
              defaultValue={currentUser.username}
              className='w-full bg-[#fffcdb] px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              onChange={handleOnChange}
            />
          </div>

          {/* for email. but it should cannot be changed */}
          <div className='mb-4'>
            <input
              type='email'
              id='email'
              placeholder='Email'
              defaultValue={currentUser.email}
              className='w-full bg-[#fffcdb]  px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500'
              disabled
            />
          </div>

        
        
          {/* button for update with hover animation */}
          <button
            type='submit'
            className='w-full bg-[#f5ea74] text-slate-700 py-2 px-4 rounded-md hover:bg-[#ece168] focus:outline-none focus:border-blue-700 transition duration-300'
          >
            {loading ? 'Loading...' : 'Update'}
          </button>
        </form>
        <div className='flex justify-between'>

          {/* delete account with hover animation */}
          <span onClick={handleDeleteAccount} className='text-red-300 cursor-pointer hover:underline'>
            Delete Account
          </span>

       
        </div>
          <p className="text-[#686333] mt-5">
        {error && "somthing went wrong" }
      </p>
      <p className="text-[#686333] text-center mt-5">
        {updateSuccess && "User is updated successfully " }
      </p>
      </div>
    
    </div>
  );
}
