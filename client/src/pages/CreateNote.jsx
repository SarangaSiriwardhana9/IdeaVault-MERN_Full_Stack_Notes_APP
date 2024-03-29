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
        color: '',
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

    const handleChangeColor = (e) => {
        setNote({
            ...note,
            color: e.target.value,
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

        setLoading(true);

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
                color: '', // Reset the color
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const colorMap = {
        red: '#ffb4ab',
        blue: '#a7bcff',
        green: '#b6ffa7',
        yellow: '#f9ffab',
        purple: '#f7b6fd',
        white: 'white',
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7]">
            <div className="flex-grow" >
                <div className=" ">
                    <div className="container mx-auto  p-8  ">
                    <h1 className="text-4xl my-4 text-center font-serif font-bold text-[#c0956d]">🗒 Create Note</h1>
                        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden bg-slate-50  shadow-xl" style={{ backgroundColor: colorMap[note.color] }}>
                            


                            <div className="px-6 py-8">
                                <input
                                    type="text"
                                    placeholder="  Enter title.."
                                    value={note.title}
                                    className={`w-full bg-[#f8f6d3]  shadow-md rounded-xl py-6 p-2 placeholder-gray-600 border-0 focus:outline-none text-lg ${errors.title ? 'border-red-500' : ''}`}
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
                                    className={`w-full  rounded-xl h-64 bg-[#f8f6d3] shadow-md p-2 placeholder-gray-600 border-0 resize-none focus:outline-none text-lg ${errors.content ? 'border-red-500' : ''}`}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.content && <p className="text-red-300 text-sm mt-1">{errors.content}</p>}
                                <select
                                    className="w-full shadow-md rounded-xl bg-[#f8f6d3] py-3 p-2 mt-4 placeholder-gray-600 border-0 focus:outline-none text-lg"
                                    value={note.color}
                                    onChange={handleChangeColor}
                                    
                                >
                                    <option value="">⚪ Default </option>
                                    <option value="red">🔴 Red</option>
                                    <option value="blue">🔵 Blue</option>
                                    <option value="green">🟢 Green</option>
                                    <option value="yellow">🟡 Yellow</option>
                                    <option value="purple">🟣 Purple</option>
                                </select>
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
