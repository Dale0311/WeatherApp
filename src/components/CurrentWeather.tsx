import { WiHumidity } from 'react-icons/wi';
import { GiWindSlap } from 'react-icons/gi';
import { CiLocationOn } from 'react-icons/ci';
import { useContext } from 'react';
import { CurrentWeatherContext } from '../context';
const CurrentWeather = () => {
  const context = useContext(CurrentWeatherContext);
  if (!context) {
    return <h1 className="text-white text-xl">No Weather data available</h1>;
  }

  const { data, error, loading } = context;

  if (loading) {
    throw new Promise((resolve) => setTimeout(() => resolve, 5000));
  }
  if (error) return <h1 className="text-3xl">{error}</h1>;

  return (
    <div className="text-white font-title">
      <div className="flex justify-center">
        <img
          src={`img/${data?.weather[0]?.icon}.png`}
          alt="icon of the current weather"
        />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <h1 className="text-6xl font-semibold">{data?.main?.temp}&#176;c</h1>
        <div className="flex items-center text-3xl relative">
          {' '}
          <CiLocationOn />
          <p>{data?.name}</p>
          <div className="text-xs absolute space-x-2 bottom-0 right-[-20px]">
            <span>{data?.sys?.country}</span>
          </div>
        </div>
        <p>{data?.weather[0]?.description}</p>
      </div>

      <div className="w-full mt-14 flex justify-around">
        <div>
          <div className="flex text-2xl items-center">
            <WiHumidity className="text-3xl" />
            <span>{data?.main?.humidity}%</span>
          </div>
          <span className="flex justify-center">Humidity</span>
        </div>
        <div>
          <div className="flex text-2xl items-center space-x-2">
            <GiWindSlap className="text-3xl" />
            <span>{data?.wind?.speed}%</span>
          </div>
          <span className="flex justify-center">Wind Speed</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
