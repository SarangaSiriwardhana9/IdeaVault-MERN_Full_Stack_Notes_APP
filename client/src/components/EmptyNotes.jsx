/* eslint-disable no-unused-vars */
import React from 'react';
import { MdNoteAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

const EmptyNotes = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <MdNoteAdd className="text-5xl text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-4">No notes found.</p>
            <Link
                to="/createnote"
                className="text-gray-800 bg-[#f8f6d3] hover:bg-[#e8e6c6] px-4 py-2 rounded-lg shadow-md transition-colors duration-300 ease-in-out"
            >
                Add Your Note Here
            </Link>
        </div>
    );
};

export default EmptyNotes;
