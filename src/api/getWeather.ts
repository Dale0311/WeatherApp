import { weatherApi, weatherGeoApi } from './configAxios';

export const getWeather = async (location: string) => {
  const appid = import.meta.env.VITE_APPID;
  try {
    const res = await weatherGeoApi.get('', {
      params: {
        q: location,
        appid,
      },
    });

    if (res.status === 200) {
      if (Array.from(res.data).length < 1) {
        throw new Error('No country corresponds with that');
      }

      const { lat, lon } = res.data[0];
      const resWeatherData = await weatherApi.get('', {
        params: {
          lat,
          lon,
          appid,
        },
      });

      if (resWeatherData.status === 200) {
        if (Array.from(resWeatherData.data).length < 1) {
          throw new Error('No Data return');
        }

        return resWeatherData.data;
      }
    }
  } catch (error) {
    return { message: error };
  }
};
