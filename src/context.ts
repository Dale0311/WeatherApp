import { createContext } from 'react';
import { TWeatherData } from './types';

type TCurrentWeatherContext = {
  data: TWeatherData | undefined;
  loading: boolean;
  error: string | null;
  refetch: (q: string) => void;
};

export const CurrentWeatherContext =
  createContext<TCurrentWeatherContext | null>(null);
