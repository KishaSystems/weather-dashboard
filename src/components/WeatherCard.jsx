import { describeWeather } from '../weatherCodes'

// A "presentational" component: it just receives data via props
// and renders it. It holds no state of its own.
export default function WeatherCard({ place, current }) {
  const { label, icon } = describeWeather(current.weather_code)

  return (
    <div className="weather-card">
      <h2>{place}</h2>
      <div className="weather-card-main">
        <span className="weather-icon">{icon}</span>
        <span className="weather-temp">{Math.round(current.temperature_2m)}°C</span>
      </div>
      <p className="weather-label">{label}</p>
      <div className="weather-details">
        <span>💧 {current.relative_humidity_2m}% humidity</span>
        <span>💨 {Math.round(current.wind_speed_10m)} km/h</span>
      </div>
    </div>
  )
}
