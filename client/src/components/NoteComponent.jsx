import React from 'react';
import { motion } from 'framer-motion';

const NoteComponent = ({ note }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="border rounded-lg shadow-lg p-4 h-40 overflow-hidden hover:shadow-xl"
        >
            <div className="font-bold mb-2 truncate">{note.title}</div>
            <p className="truncate">{note.content}</p>
        </motion.div>
    );
};

export default NoteComponent;
