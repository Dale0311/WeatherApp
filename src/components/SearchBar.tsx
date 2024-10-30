import { IoMdSearch } from 'react-icons/io';

const SearchBar = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="flex space-x-2 w-3/4">
        <input
          type="text"
          className="p-3 bg-[#EBFDFD] outline-none rounded-2xl flex-1"
          placeholder="Search..."
        />
        <button className="p-4 rounded-full bg-[#EBFDFD]">
          <IoMdSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
