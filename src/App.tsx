import WeatherWrapper from './components/WeatherWrapper';
import { CurrentWeatherContext } from './context';
import useCurrentWeather from './hooks/useCurrentWeather';

const App = () => {
  const currentWeatherData = useCurrentWeather();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#E3D8FD]">
      <CurrentWeatherContext.Provider value={currentWeatherData}>
        <WeatherWrapper />
      </CurrentWeatherContext.Provider>
    </div>
  );
};

export default App;
