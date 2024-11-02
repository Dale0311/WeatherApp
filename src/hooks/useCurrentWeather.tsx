import { useEffect, useState } from 'react';
import { weatherApi, weatherGeoApi } from '../api/configAxios';
import { TWeatherData } from '../types';

type TWeatherState = {
  data?: TWeatherData;
  loading: boolean;
  error: string | null;
};

export default function useCurrentWeather() {
  const [state, setState] = useState<TWeatherState>({
    data: undefined,
    error: null,
    loading: false,
  });
  const [q, setQ] = useState<string>('Tarlac, PH');

  // 1. get the latitude and longitude using a state/country q search.
  // 2. if there is a corresponding latitude and longitude then use it to get current weather data.
  const getCurrentWeather = async () => {
    const appid = import.meta.env.VITE_APPID;
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

      // if no data recieves
      if (
        !resWeatherData.data &&
        Object.keys(resWeatherData.data).length === 0
      ) {
        const error = new Error('No data return');
        error.name = 'NoData';
        throw error;
      }
      setState((s) => ({ ...s, data: resWeatherData.data }));
      // setState({ ...state, data: resWeatherData.data });
    } catch (error) {
      setState((s) => ({ ...s, error: 'something went wrong' }));
    } finally {
      setState((s) => ({ ...s, loading: false }));
    }
  };

  const refetch = (q: string) => setQ(q);
  useEffect(() => {
    const delay = () => {
      setState((s) => ({ ...s, loading: false }));
      setTimeout(() => getCurrentWeather(), 5000);
    };
    delay();
  }, [q]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch,
  };
}
