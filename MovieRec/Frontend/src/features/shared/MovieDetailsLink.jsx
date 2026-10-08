import { Link } from "react-router"

const MovieDetailsLink = ({ movie, className, children, ...linkProps }) => {
  const movieId = movie?.id ?? movie?.title ?? movie?.name

  return (
    <Link
      {...linkProps}
      className={className}
      to={`/movie/${encodeURIComponent(movieId)}`}
      state={{ movie }}
    >
      {children}
    </Link>
  )
}

export default MovieDetailsLink
