/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader'; // Import the Loader component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../custom-toast.css'; // Import custom toast style

const UpdateNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState({ title: '', content: '' });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false); // Add a loading state

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch(`/api/note/get-note-by-id/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch note');
                }
                const data = await response.json();
                setNote({
                    title: data.title,
                    content: data.content,
                });
            } catch (error) {
                console.log('Error fetching note:', error.message);
            }
        };

        fetchNote();
    }, [id, currentUser.token]);

    const handleTitleChange = (e) => {
        setNote({
            ...note,
            title: e.target.value,
        });
    };

    const handleContentChange = (e) => {
        setNote({
            ...note,
            content: e.target.value,
        });
    };

    const handleSubmit = async () => {
        setLoading(true); // Set loading to true before the fetch call
        try {
            const response = await fetch(`/api/note/update-note/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${currentUser.token}`,
                },
                body: JSON.stringify({
                    title: note.title,
                    content: note.content,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update note');
            }
            // Handle success
            console.log('Note updated successfully');
            // Show success toast
            toast.success('Note updated successfully!', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                className: 'custom-toast', // Use custom-toast class
            });
        } catch (error) {
            console.log('Error updating note:', error.message);
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
                            <h1 className="text-2xl mt-2 text-center font-serif font-bold text-slate-600">Update Note</h1>
                            <div className="px-6 py-8">
                                <input
                                    type="text"
                                    placeholder="  Enter title"
                                    value={note.title}
                                    className="w-full bg-gray-200 shadow-md rounded-xl py-6 p-2 placeholder-gray-600 border-0 focus:outline-none text-lg"
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <div className="px-6 py-4">
                                <textarea
                                    value={note.content}
                                    placeholder="  Write your note here..."
                                    className="w-full rounded-xl h-64 bg-gray-200 shadow-md p-2 placeholder-gray-600 border-0 resize-none focus:outline-none text-lg"
                                    onChange={handleContentChange}
                                ></textarea>
                            </div>
                            <div className=" px-6 py-4">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-[#fdeb83] hover:bg-[#fffd78] shadow-lg text-slate-600  font-bold py-2 px-4 rounded focus:outline-none"
                                >
                                    Update
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
};

export default UpdateNote;
