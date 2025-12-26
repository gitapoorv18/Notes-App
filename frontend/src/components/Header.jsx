import React from 'react';

import { MdSearch } from 'react-icons/md';
const Header = ({ handleSearchTitle, handleSearchContent }) => {
  const handleSearch = (e) => {
    const value = e.target.value;
    handleSearchTitle(value);
    handleSearchContent(value);
  };
  return (
    <div className="p-4 grid items-center gap-5">
      <h1 className="text-4xl ">Notes </h1>

      <div className="flex items-center gap-3 bg-gray-100 rounded-full px-5 py-3 flex-1 max-w-full ml-6 ">
        <MdSearch size="2rem" />
        <input
          type="text"
          placeholder="search notes here ....."
          className="outline-none"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};
export default Header;
