import { useState } from 'react'

// "Controlled component": the input's value lives in React state,
// not in the DOM. React re-renders the input every keystroke.
export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState('')

  function handleSubmit(e) {
    e.preventDefault() // stop the browser's default full-page-reload form submit
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search a city, e.g. Colombo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}
