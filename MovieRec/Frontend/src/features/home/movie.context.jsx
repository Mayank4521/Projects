import { createContext, useState } from "react"
import {
  HOME_MOVIE_SECTIONS,
  INITIAL_WISHLIST_IDS,
  MOVIE_CATALOG,
} from "../shared/movieCatalog.js"

export const MOCK_MOVIES = MOVIE_CATALOG.slice(0, 8)

export const MOCK_SECTIONS = Object.fromEntries(
  Object.entries(HOME_MOVIE_SECTIONS).map(([key, ids]) => [
    key,
    ids.map((id) => MOVIE_CATALOG.find((movie) => movie.id === id)).filter(Boolean),
  ]),
)

const createWishlistEntry = (movie, savedAt = Date.now()) => ({
  ...movie,
  added: new Date(savedAt).toLocaleDateString(),
  watched: false,
  priority: false,
  note: "Added to your MovieRec wishlist",
  poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  genre: movie.genres.join(" / "),
  platform: movie.platforms[0] || "Streaming availability varies",
})

const getInitialWishlist = () => {
  const savedWishlist = localStorage.getItem("movierec-wishlist")
  if (savedWishlist) return JSON.parse(savedWishlist)

  return INITIAL_WISHLIST_IDS
    .map((id) => MOVIE_CATALOG.find((movie) => movie.id === id))
    .filter(Boolean)
    .map((movie) => createWishlistEntry(movie))
}

export const movieContext = createContext(null)

export const MovieContextProvider = ({ children }) => {
  const [movies] = useState(MOCK_MOVIES)
  const [sections] = useState(MOCK_SECTIONS)
  const [wishlist, setWishlist] = useState(getInitialWishlist)
  const [loading] = useState(false)
  const [error] = useState(null)

  const updateWishlist = (nextWishlist) => {
    setWishlist(nextWishlist)
    localStorage.setItem("movierec-wishlist", JSON.stringify(nextWishlist))
  }

  const addToWishlist = (movie) => {
    const id = String(movie.id)
    if (wishlist.some((savedMovie) => String(savedMovie.id) === id)) return
    updateWishlist([...wishlist, createWishlistEntry(movie)])
  }

  const removeFromWishlist = (movieId) => {
    updateWishlist(wishlist.filter((movie) => String(movie.id) !== String(movieId)))
  }

  const toggleWishlist = (movie) => {
    if (wishlist.some((savedMovie) => String(savedMovie.id) === String(movie.id))) {
      removeFromWishlist(movie.id)
    } else {
      addToWishlist(movie)
    }
  }

  const toggleWatched = (movieId) => {
    updateWishlist(wishlist.map((movie) => String(movie.id) === String(movieId)
      ? { ...movie, watched: !movie.watched }
      : movie))
  }

  return (
    <movieContext.Provider value={{
      movies,
      sections,
      loading,
      error,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      toggleWatched,
    }}>
      {children}
    </movieContext.Provider>
  )
}
