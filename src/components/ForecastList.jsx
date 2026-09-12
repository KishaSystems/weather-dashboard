import { describeWeather } from '../weatherCodes'

function dayLabel(dateStr, index) {
  if (index === 0) return 'Today'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export default function ForecastList({ daily }) {
  return (
    <div className="forecast-list">
      {/* .map() over the array is the standard way to render a list in React.
          Each item needs a unique "key" prop so React can track it efficiently. */}
      {daily.time.map((date, i) => {
        const { icon } = describeWeather(daily.weather_code[i])
        return (
          <div className="forecast-item" key={date}>
            <span className="forecast-day">{dayLabel(date, i)}</span>
            <span className="forecast-icon">{icon}</span>
            <span className="forecast-temps">
              {Math.round(daily.temperature_2m_max[i])}° / {Math.round(daily.temperature_2m_min[i])}°
            </span>
          </div>
        )
      })}
    </div>
  )
}
