/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { RiPushpinFill, RiUnpinFill } from 'react-icons/ri';
import { formatDistanceToNow } from 'date-fns';
import '../Font.css';
import Loader from './Loader';
const NoteComponent = ({ note, onDelete, onUpdatePinnedStatus }) => {
    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        onDelete(note._id);
    };

    const handleUpdatePinnedStatus = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newPinnedStatus = !note.isPinned;
        onUpdatePinnedStatus(note._id, newPinnedStatus);
    };

    //console.log("id", note._id, "color", note.color);

    const truncatedTitle =
        note.title.length > 15 ? `${note.title.slice(0, 15)}...` : note.title;

        const colorMap = {
            red: '#ffb4ab',
            blue: '#a7bcff',
            green: '#b6ffa7',
            yellow: '#f9ffab',
            purple: '#f7b6fd',
            white: 'white',
          };

    return (
        <Link to={`/update-note/${note._id}`} className="text-black">
           <div
      className="shadow-xl p-4 rounded-lg w-92 h-48 overflow-hidden relative"
      style={{ backgroundColor: note.color ? colorMap[note.color] : 'white' }}
    >
                <div className="flex justify-between items-center mb-2">
                    <div className="my-text text-xl font-normal truncate ">
                        {truncatedTitle}
                    </div>
                    <div>
                        <button
                            onClick={handleUpdatePinnedStatus}
                            className="mr-2 shadow-2xl bg-[#dfdeb8] hover:bg-[#f9ffab] p-1 rounded-full"/* e2e297 */
                        >
                            {note.isPinned ? (
                                <RiUnpinFill className="text-[#585830] shadow-2xl rounded-2xl hover:text-[#a0944e] text-2xl" />
                            ) : (
                                <RiPushpinFill className="text-[#535343] shadow-2xl rounded-2xl hover:text-[#4d4a3f] text-2xl" />
                            )}
                        </button>
                    </div>
                </div>
                <hr className="text-slate-800" />{' '}
                {/* Darken the horizontal rule */}
                <p className="line-clamp-3">{note.content}</p>
                <div className="absolute bottom-2 left-2">
                    <button
                        onClick={handleDelete}
                        className="text-[#f37b57] hover:text-[#965249] mr-2 shadow-2xl bg-[#dfdeb8] hover:bg-[#f9ffab] p-1 rounded-full"
                    >
                        <MdDelete className="text-2xl" />
                    </button>
                </div>
                <div className="absolute bottom-2 right-2 text-gray-500">
                    Created {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </div>
            </div>
        </Link>
    );
};

export default NoteComponent;
