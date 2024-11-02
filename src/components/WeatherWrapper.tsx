import { Suspense } from 'react';
import CurrentWeather from './CurrentWeather';
import SearchBar from './SearchBar';
import Spinner from './Spinner';

const WeatherWrapper = () => {
  return (
    <div className="bg-[#4A28C7] h-[600px] w-[600px] mx-auto p-4 py-8 space-y-4 rounded-lg">
      <SearchBar />
      <Suspense fallback={<Spinner />}>
        <CurrentWeather />
      </Suspense>
    </div>
  );
};

export default WeatherWrapper;
