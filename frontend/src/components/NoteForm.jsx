import React from 'react';
const NoteForm = ({
  handleAdd,
  title,
  setTitle,
  content,
  setContent,
  isExpanded,
  setIsExpanded,
}) => {
  return (
    <div className="max-w-3xl mx-auto mt-6">
      <form
        onSubmit={(e) => {
          handleAdd(e);
          setIsExpanded(false);
        }}
        className="bg-yellow-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow my-5 flex flex-col justify-between gap-1 mx-2 min-w-10"
        action=""
      >
        {isExpanded && (
          <input
            className="outline-none"
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        )}

        <textarea
          rows={isExpanded ? 4 : 1}
          className="outline-none resize-none text-gray-700 p-2"
          placeholder="Add your note here"
          value={content}
          onClick={() => setIsExpanded(true)}
          onChange={(e) => setContent(e.target.value)}
        />

        {isExpanded && (
          <div className="flex justify-end gap-4 mt-4">
            <button type="submit" className="text-sm font-medium text-gray-800">
              {' '}
              Save
            </button>

            <button
              type="button"
              className="text-sm font-medium text-gray-800 "
              onClick={() => {
                setIsExpanded(false);
                setTitle('');
                setContent('');
              }}
            >
              Close
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default NoteForm;
