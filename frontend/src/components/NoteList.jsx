import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, onEdit, handleDelete }) => {
  return (
    <div className=" grid grid-col-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-10 pt-8">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          handleDelete={handleDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
export default NoteList;
