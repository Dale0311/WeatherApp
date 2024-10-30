import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import useCurrentWeather from '../hooks/useCurrentWeather';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const { getCurrentWeather } = useCurrentWeather(); //! this cause to fetch again without any location
  const handleClickSearch = () => {
    getCurrentWeather(location);
  };
  return (
    <div className="w-full flex justify-center">
      <div className="flex space-x-2 w-3/4">
        <input
          type="text"
          className="p-3 bg-[#EBFDFD] outline-none rounded-2xl flex-1"
          placeholder="Search..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          className="p-4 rounded-full bg-[#EBFDFD]"
          onClick={handleClickSearch}
        >
          <IoMdSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
