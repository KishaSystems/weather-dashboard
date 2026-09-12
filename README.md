# Weather Dashboard (React + Vite)

A small, real, working project for learning React by building. It searches a
city, geocodes it, and shows current weather + a 5-day forecast using the free
[Open-Meteo API](https://open-meteo.com/) — no API key required.

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
  main.jsx              # mounts <App /> into the DOM (only place touching ReactDOM)
  App.jsx               # top-level state (`city`) + composes everything
  App.css
  weatherCodes.js        # plain helper data, no React needed
  hooks/
    useWeather.js        # custom hook: fetch + loading/error state
  components/
    SearchBar.jsx         # controlled input, lifts state up via onSearch
    WeatherCard.jsx        # presentational component
    ForecastList.jsx       # renders a list with .map() + keys
    LoadingSpinner.jsx
```

## React concepts this project covers

- **Components & props** — `WeatherCard`, `ForecastList`, `SearchBar` all
  receive data via props and render it. They don't know or care where the
  data came from.
- **State (`useState`)** — `App.jsx` holds the current `city` in state.
  `SearchBar` holds its own input text in state (a "controlled input").
- **Effects (`useEffect`)** — `useWeather.js` fetches data whenever `city`
  changes, and cleans up if a new search starts before the old one finishes
  (avoiding a race condition).
- **Custom hooks** — `useWeather` bundles fetch/loading/error logic into one
  reusable function, keeping `App.jsx` focused on rendering.
- **Lifting state up** — `SearchBar` doesn't own the city; it calls
  `onSearch(city)` and lets the parent (`App`) decide what to do.
- **Conditional rendering** — `App.jsx` shows a spinner, an error, or the
  data, never more than one at a time.
- **Lists and keys** — `ForecastList` maps over an array of days, giving each
  rendered element a unique `key`.

## Ideas to extend it yourself (best way to actually learn)

1. Add a "favorite cities" list saved with `useState` (array of strings) with
   buttons to quickly re-search them.
2. Show a toast/message when a city search fails, auto-dismissing after 3s
   (practice `useEffect` + `setTimeout`).
3. Add a toggle for °C/°F (practice derived state vs. stored state).
4. Split `city` state into the app's own **Context** if you add more pages
   (practice `useContext`).
5. Add a `localStorage`-backed "last searched city" so it's remembered on
   reload (practice `useEffect` for syncing to storage).
6. Add hourly forecast as a chart using a library like `recharts`.

Good luck — build it, break it, then fix it. That loop is how React actually
sinks in.
