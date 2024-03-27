/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import AppFooter from "../components/Footer";

export default function CreateNote() {
    const { currentUser } = useSelector((state) => state.user);
    const [note, setNote] = useState({
        title: '',
        content: '',
        userId: currentUser._id,
    });
    const [errors, setErrors] = useState({});

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
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="flex-grow bg-gradient-to-r from-[rgb(255,255,255)] via-[#fff9f4] to-[#faffad]">
                <div className=" ">
                    <div className="container mx-auto  mt-14 sha ">
                        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden bg-slate-50  shadow-2xl">
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
                                    className="bg-[#f1e59e] hover:bg-[#fffeb4] shadow-lg text-slate-600  font-bold py-2 px-4 rounded focus:outline-none"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}
