import { useEffect, useState } from 'react';
import { weatherApi, weatherGeoApi } from '../api/configAxios';
import { TWeatherData } from '../types';

export default function useCurrentWeather(q?: string) {
  const [data, setData] = useState<TWeatherData | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // flow
  // 1. get the latitude and longitude using a state/country q search.
  // 2. if there is a corresponding latitude and longitude then use it to get current weather data.
  const getCurrentWeather = async (q: string | undefined) => {
    const appid = import.meta.env.VITE_APPID;
    setLoading(true);
    try {
      // send a request for the given location
      const res = await weatherGeoApi.get('', {
        params: {
          q,
          appid,
        },
      });

      // if there is no data
      if (Array.from(res.data).length < 1) {
        const error = new Error('No Location corresponds with the query');
        error.name = 'NotFound';
        throw error;
      }

      // if there is a lat and lon
      const { lat, lon } = res.data[0];
      // send a request to get the current weather data
      const resWeatherData = await weatherApi.get('', {
        params: {
          lat,
          lon,
          appid,
          units: 'metric',
        },
      });

      if (resWeatherData.status === 200) {
        // if no data recieves
        if (
          !resWeatherData.data &&
          Object.keys(resWeatherData.data).length === 0
        ) {
          const error = new Error('No data return');
          error.name = 'NoData';
          throw error;
        }
        setData(resWeatherData.data);
      }
    } catch (error) {
      setError('something went wrong');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCurrentWeather(q);
  }, [q]);

  return { data, loading, error, getCurrentWeather };
}
