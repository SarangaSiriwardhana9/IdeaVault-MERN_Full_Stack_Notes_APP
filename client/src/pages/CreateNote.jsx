/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../custom-toast.css'; // Import custom toast style
import Loader from '../components/Loader'; // Import the Loader component

export default function CreateNote() {
    const { currentUser } = useSelector((state) => state.user);
    const [note, setNote] = useState({
        title: '',
        content: '',
        userId: currentUser._id,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Add a loading state

    const handleChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '', // Clear any previous errors for the field
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate title and content
        const validationErrors = {};
        if (!note.title.trim()) {
            validationErrors.title = 'Title is required';
        }
        if (!note.content.trim()) {
            validationErrors.content = 'Content is required';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true); // Set loading to true before the fetch call

        try {
            const response = await fetch('/api/note/create-note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser.token}`,
                },
                body: JSON.stringify(note),
            });
            const data = await response.json();
            console.log(data);
            // Show success alert
            toast.success('Note saved successfully!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'custom-toast', // Use custom-toast class
            });
            // Clear form
            setNote({
                title: '',
                content: '',
                userId: currentUser._id,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false); // Set loading to false after the fetch call completes
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="flex-grow bg-gradient-to-r from-[rgb(255,255,255)] via-[#fff9f4] to-[#faffad]">
                <div className=" ">
                    <div className="container mx-auto  p-8  ">
                        
                        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden bg-slate-50  shadow-2xl">
                        <h1 className="text-2xl mt-2 text-center font-serif font-bold text-slate-600">Create Note</h1>


                            <div className="px-6 py-8">
                                <input
                                    type="text"
                                    placeholder="  Enter title"
                                    value={note.title}
                                    className={`w-full bg-gray-200 shadow-md rounded-xl py-6 p-2 placeholder-gray-600 border-0 focus:outline-none text-lg ${errors.title ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                    name="title"
                                    id="title"
                                />
                                {errors.title && <p className="text-red-300 text-sm mt-1">{errors.title}</p>}
                            </div>
                            <div className="px-6 py-4">
                                <textarea
                                    id="content"
                                    name="content"
                                    value={note.content}
                                    placeholder="  Write your note here..."
                                    className={`w-full  rounded-xl h-64 bg-gray-200 shadow-md p-2 placeholder-gray-600 border-0 resize-none focus:outline-none text-lg ${errors.content ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.content && <p className="text-red-300 text-sm mt-1">{errors.content}</p>}
                            </div>
                            <div className=" px-6 py-4">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-[#fdeb83] hover:bg-[#fffd78] shadow-lg text-slate-600  font-bold py-2 px-4 rounded focus:outline-none"
                                >
                                    Save
                                </button>
                            </div>
                            {loading && <Loader />} {/* Show the Loader component if loading is true */}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
