/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../custom-toast.css'; 
//navigate
import { useNavigate } from 'react-router-dom';

const UpdateNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState({ title: '', content: '', color: '' });
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            setLoading(true); // Show the loader
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
                    color: data.color || '',
                });
            } catch (error) {
                console.log('Error fetching note:', error.message);
            } finally {
                setLoading(false); // Hide the loader
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

    const handleColorChange = (e) => {
        setNote({
            ...note,
            color: e.target.value,
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
                    color: note.color,
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
                style: {
                    background: 'yellow',
                    color: 'black',
                },
                

                 // Navigate to the MyNotes page after updating the note
            });
            // Navigate to the MyNotes page after updating the note after tost message displayed
            setTimeout(() => {
                navigate('/mynotes');
            }, 1000);
            
        } catch (error) {
            console.log('Error updating note:', error.message);
        } finally {
            setLoading(false); // Set loading to false after the fetch call completes
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
        <div className="min-h-screen flex flex-col justify-between  bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7]">
            <div className="flex-grow" >
                <div className=" ">
                    <div className="container mx-auto  p-8  ">
                    <h1 className="text-3xl my-4 text-center font-serif font-bold text-[#c0956d]">📝 Update Note</h1>
                        <div className="max-w-4xl mx-auto rounded-lg overflow-hidden bg-slate-50  shadow-xl"style={{ backgroundColor: colorMap[note.color] }}>
                            
                            <div className="px-6 py-8">
                                <input
                                    type="text"
                                    placeholder="  Enter title"
                                    value={note.title}
                                    className="w-full bg-[#f8f6d3] shadow-md rounded-xl py-6 p-2 placeholder-gray-600 border-0 focus:outline-none text-lg"
                                    onChange={handleTitleChange}
                                />
                            </div>
                            <div className="px-6 py-4">
                                <textarea
                                    value={note.content}
                                    placeholder="  Write your note here..."
                                    className="w-full rounded-xl h-64 bg-[#f8f6d3] shadow-md p-2 placeholder-gray-600 border-0 resize-none focus:outline-none text-lg"
                                    onChange={handleContentChange}
                                ></textarea>
                            </div>
                            <div className=" px-6 py-4">
                                <select
                                    className="w-full bg-[#f8f6d3] shadow-md rounded-xl py-3 p-2 mt-4 placeholder-gray-600 border-0 focus:outline-none text-lg"
                                    value={note.color}
                                    onChange={handleColorChange}
                                >
                                     <option value="">⚪ Default </option>
                                    <option value="red">🔴 Red</option>
                                    <option value="blue">🔵 Blue</option>
                                    <option value="green">🟢 Green</option>
                                    <option value="yellow">🟡 Yellow</option>
                                    <option value="purple">🟣 Purple</option>
                                </select>
                            </div>
                            <div className="px-6 py-4 flex justify-center">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-[#fdeb83] hover:bg-[#fffd78] rounded-3xl shadow-lg text-slate-600  font-bold py-2 px-4  focus:outline-none mr-4"
                                >
                                    Update
                                </button>
                                <Link to="/mynotes" className="bg-[#fcd499] hover:bg-[#f1d091] rounded-3xl shadow-lg text-slate-600  font-bold py-2 px-4  focus:outline-none">
                                    Back
                                </Link>
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
