/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoteComponent from "../components/NoteComponent";
import Loader from "../components/Loader";
import { FaSearch } from "react-icons/fa";
import EmptyNotes from "../components/EmptyNotes";
import '../Font.css'

export default function MyNotes() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [unpinnedNotes, setUnpinnedNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/note/search-notes${searchTerm ? `?query=${searchTerm}` : ""}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        const sortedNotes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotes(sortedNotes);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching notes:', error.message);
        setLoading(false);
      }
    };

    fetchNotes();
  }, [currentUser.token, searchTerm]);

  useEffect(() => {
    const pinned = notes.filter((note) => note.isPinned);
    const unpinned = notes.filter((note) => !note.isPinned);
    setPinnedNotes(pinned.slice(0, 6)); // Limit pinned notes to a maximum of 6
    setUnpinnedNotes(unpinned.slice((currentPage - 1) * notesPerPage, currentPage * notesPerPage));
  }, [notes, currentPage, notesPerPage]);

  const deleteNote = async (noteId) => {
    try {
      setLoading(true); // Show loader
      const response = await fetch(`/api/note/delete-note/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.log('Error deleting note:', error.message);
    } finally {
      setLoading(false); // Hide loader
    }
  };
  
  const updateNotePinnedStatus = async (noteId, isPinned) => {
    try {
      setLoading(true); // Show loader
      const pinnedCount = notes.filter((note) => note.isPinned).length;
      if (isPinned && pinnedCount >= 6) {
        throw new Error('Maximum of 6 notes can be pinned');
      }
  
      const response = await fetch(`/api/note/update-note-pinned-status/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({ isPinned }),
      });
      if (!response.ok) {
        throw new Error('Failed to update pinned status');
      }
      setNotes(notes.map((note) => (note._id === noteId ? { ...note, isPinned } : note)));
    } catch (error) {
      console.log('Error updating pinned status:', error.message);
      toast.error(error.message); // Show error in toast
    } finally {
      setLoading(false); // Hide loader
    }
  };
  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen  flex flex-col bg-gradient-to-r from-[#fdfdf9] via-[#f3e7e9] to-[#f3f9a7]">
      <div className="flex  flex-col">
        <div className="flex justify-center mt-4 items-center mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search notes"
              value={searchTerm}
              onChange={handleSearch}
              className="border-2 border-gray-300 rounded-3xl w-full md:w-96 h-10 bg-white px-5 text-sm focus:outline-none"
            />
            <FaSearch className="absolute right-2 top-3 text-gray-400" />
          </div>


        </div>
        <div className="flex flex-col  mb-8">{/* top */}
          {loading && <Loader />} {/* Show loader while loading notes */}
          {!loading && pinnedNotes.length > 0 && (
            <>
              <div className="flex items-center justify-center">
                <h1 className="my-text text-shadow-strong text-3xl md:text-4xl font-bold text-[#997757] mb-4 py-3">📌 Pinned Notes</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-24">
                {pinnedNotes.map((note) => (
                  <NoteComponent
                    key={note._id}
                    note={note}
                    onDelete={deleteNote}
                    onUpdatePinnedStatus={updateNotePinnedStatus}
                  />
                ))}
              </div>
            </>
          )}
          {!loading && unpinnedNotes.length > 0 && (
            <>
              <div className="flex items-center justify-center">
                <h1 className="my-text text-shadow-strong text-3xl md:text-4xl font-bold text-[#997757] mb-4 py-6">📝 All Notes</h1>
              </div>
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-24">
                {unpinnedNotes.map((note) => (
                  <NoteComponent
                    key={note._id}
                    note={note}
                    onDelete={deleteNote}
                    onUpdatePinnedStatus={updateNotePinnedStatus}
                    className=""
                  />
                ))}
              </div>
              {Math.ceil(notes.length / notesPerPage) > 1 && (
                <nav className="mt-4 mb-4" aria-label="Pagination">
                  <ul className="flex justify-center">
                    {Array.from({ length: Math.ceil(notes.length / notesPerPage) }, (_, i) => (
                      <li key={i} className="mx-2">
                        <button
                          className={`${i + 1 === currentPage
                            ? 'bg-[#d1c167] text-black'
                            : 'bg-[#d1c78b] text-[#997757]'
                            } px-3 py-1 rounded-full`}
                          onClick={() => paginate(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </>
          )}


          {!loading && pinnedNotes.length === 0 && unpinnedNotes.length === 0 && (
            <EmptyNotes />
          )}
        </div>
        <ToastContainer /> {/* Container for displaying toasts */}
      </div>
    </div>
  );



}
