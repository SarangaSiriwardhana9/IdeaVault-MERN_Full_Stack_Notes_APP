/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { RiPushpinFill, RiUnpinFill } from 'react-icons/ri';
import { formatDistanceToNow } from 'date-fns';

const NoteComponent = ({ note, onDelete, onUpdatePinnedStatus }) => {
    const handleDelete = () => {
        onDelete(note._id);
    };

    const handleUpdatePinnedStatus = () => {
        const newPinnedStatus = !note.isPinned;
        onUpdatePinnedStatus(note._id, newPinnedStatus);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const truncatedTitle = note.title.length > 15 ? `${note.title.slice(0, 15)}...` : note.title;

    return (
        <div className="bg-gray-200 shadow-md p-4 rounded-lg w-92 h-48 overflow-hidden relative">
            <div className="flex justify-between items-center mb-2">
                <div className="font-bold truncate">{truncatedTitle}</div>
                <div>
                    <button onClick={handleUpdatePinnedStatus} className="mr-2">
                        {note.isPinned ? (
                            <RiUnpinFill className="text-green-500 text-2xl" />
                        ) : (
                            <RiPushpinFill className="text-black text-2xl" />
                        )}
                    </button>
                    <button onClick={handleDelete} className="text-red-600 hover:text-red-800">
                        <MdDelete className="text-2xl" />
                    </button>
                </div>
            </div>
            <p className="line-clamp-4">{note.content}</p>
            <div className="absolute bottom-2 right-2 text-gray-500">
                Created {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
            </div>
        </div>
    );
};

export default NoteComponent;
