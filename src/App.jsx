import { useState } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastList from './components/ForecastList'
import LoadingSpinner from './components/LoadingSpinner'
import { useWeather } from './hooks/useWeather'
import './App.css'

export default function App() {
  // `city` is the single source of truth. Changing it triggers
  // useWeather's effect to refetch — that's the whole data flow.
  const [city, setCity] = useState('Colombo')
  const { data, loading, error } = useWeather(city)

  return (
    <div className="app">
      <h1>🌦️ Weather Dashboard</h1>
      <SearchBar onSearch={setCity} />

      {/* Conditional rendering: show exactly one of these three states. */}
      {loading && <LoadingSpinner />}
      {error && <p className="error">⚠️ {error}</p>}
      {data && !loading && !error && (
        <>
          <WeatherCard place={data.place} current={data.current} />
          <ForecastList daily={data.daily} />
        </>
      )}
    </div>
  )
}
