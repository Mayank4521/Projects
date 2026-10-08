import { useContext } from "react"
import { movieContext } from "../home/movie.context.jsx"

export const useWishlist = () => {
  const context = useContext(movieContext)

  if (!context) {
    throw new Error("useWishlist must be used within MovieContextProvider")
  }

  return {
    wishlist: context.wishlist,
    addToWishlist: context.addToWishlist,
    removeFromWishlist: context.removeFromWishlist,
    toggleWishlist: context.toggleWishlist,
    toggleWatched: context.toggleWatched,
  }
}
