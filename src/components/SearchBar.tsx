import { useContext, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { CurrentWeatherContext } from '../context';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const context = useContext(CurrentWeatherContext);
  if (!context) {
    return <h1 className="text-white text-xl">No Weather Data available</h1>;
  }
  const { refetch } = context;
  const handleClickSearch = () => {
    refetch(location);
  };

  const emptyTitle = Boolean(!location);

  return (
    <div className="w-full flex justify-center">
      <div className="flex space-x-2 w-3/4">
        <input
          type="text"
          className="p-3 bg-[#EBFDFD] outline-none rounded-2xl flex-1"
          placeholder="Tarlac, PH"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          className="p-4 rounded-full bg-[#EBFDFD] disabled:cursor-not-allowed"
          disabled={emptyTitle}
          onClick={handleClickSearch}
        >
          <IoMdSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
