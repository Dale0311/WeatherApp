import { WiHumidity } from 'react-icons/wi';
import { GiWindSlap } from 'react-icons/gi';
import { CiLocationOn } from 'react-icons/ci';

import useCurrentWeather from '../hooks/useCurrentWeather';

const CurrentWeather = () => {
  const { data, loading } = useCurrentWeather('Philippines');

  if (loading) return <h1 className="text-3xl">Loading...</h1>;

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
          <p className="text-xs absolute bottom-0 right-[-20px]">
            {data?.sys?.country}
          </p>
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
