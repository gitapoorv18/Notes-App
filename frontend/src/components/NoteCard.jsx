import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

const NoteCard = ({ id, title, content, handleDelete, onEdit }) => {
  return (
    <div className="  bg-yellow-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow h-fit  ">
      <div className="">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-700 text-sm overflow-y-auto grow">{content}</p>
      </div>

      <div className="flex  justify-end gap-3">
        <MdEdit
          size="1.25em"
          onClick={() => onEdit({ id, title, content })}
          className=" hover:cursor-pointer"
        />
        <FaRegTrashCan
          size="1.25em"
          onClick={() => handleDelete(id)}
          className=" hover:cursor-pointer"
        />
      </div>
    </div>
  );
};
export default NoteCard;
