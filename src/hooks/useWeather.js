import { useEffect, useState } from 'react'

// A "custom hook" is just a normal function that starts with "use"
// and calls other hooks inside it. It lets us pull data-fetching
// logic out of a component so the component can focus on rendering.
export function useWeather(city) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Guard clause: don't fetch if there's no city to search for.
    if (!city) return

    // This flag prevents a "race condition": if the user types a new
    // city before the old request finishes, we ignore the stale result.
    let cancelled = false

    async function fetchWeather() {
      setLoading(true)
      setError(null)
      try {
        // Step 1: turn the city name into latitude/longitude.
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city,
          )}&count=1`,
        )
        const geoJson = await geoRes.json()
        const place = geoJson.results?.[0]

        if (!place) {
          throw new Error(`Couldn't find a place called "${city}"`)
        }

        // Step 2: fetch current + daily forecast for those coordinates.
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}` +
            `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min` +
            `&timezone=auto`,
        )
        const weatherJson = await weatherRes.json()

        if (!cancelled) {
          setData({
            place: `${place.name}${place.country ? ', ' + place.country : ''}`,
            current: weatherJson.current,
            daily: weatherJson.daily,
          })
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchWeather()

    // Cleanup function: React calls this if `city` changes again
    // (or the component unmounts) before the effect reruns.
    return () => {
      cancelled = true
    }
  }, [city]) // Re-run this effect only when `city` changes.

  return { data, loading, error }
}
