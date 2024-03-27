/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import AppFooter from "../components/Footer";
import NoteComponent from "../components/NoteComponent";

export default function MyNotes() {
    const { currentUser } = useSelector((state) => state.user);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('/api/note/getNotesByUserId', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentUser.token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }
                const data = await response.json();
                
                setNotes(data);
                
            } catch (error) {
                console.log('Error fetching notes:', error.message);
            }
        };
    
        fetchNotes();
    }, [currentUser.token]);

        
        console.log("notes",notes);
   
    return (
        <div className="min-h-screen flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center h-full">

            <h1 className="text-3xl font-bold mb-4">My Notes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {/* use NoteComponent */}
                {notes.map((note) => (
                      <NoteComponent key={note._id} note={note} />
                 ))}
                
                </div>
          
           
            
        </div>
        <AppFooter />
    </div>
    );
}