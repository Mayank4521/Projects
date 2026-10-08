import { getMovieImageUrl } from '../utils/homeUtils.js'
import MovieDetailsLink from '../../shared/MovieDetailsLink.jsx'

const MovieCard = ({ movie, genres = [], isSaved = false, onToggleWishlist }) => {
  const posterUrl = getMovieImageUrl(movie?.poster_path, 'w500') || movie?.poster
  const rating = movie?.vote_average?.toFixed(1) ?? movie?.rating ?? 'NR'
  const genreText = genres[0] || 'Movie'
  const year = movie?.release_date?.slice(0, 4) || movie?.first_air_date?.slice(0, 4) || movie?.year || 'Release date unknown'
  const title = movie?.title || movie?.name || 'Untitled'

  return (
    <article className="movie-card">
      <MovieDetailsLink movie={movie} className="movie-details-link">
        <div
          className="movie-poster"
          style={{
            background: posterUrl
              ? `linear-gradient(135deg, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.7)), url("${posterUrl}") center/cover no-repeat`
              : movie?.gradient || 'linear-gradient(135deg, rgba(99,102,241,0.9), rgba(168,85,247,0.75))',
          }}
        >
          <span className="play-chip">▶</span>
          <span className="rating-badge">★ {rating}</span>
        </div>
        <div className="movie-details">
          <h3 className="movie-title">{title}</h3>
          <div className="movie-label">{genreText} • {year}</div>
        </div>
      </MovieDetailsLink>
      <button
        className={`home-wishlist-button${isSaved ? ' is-saved' : ''}`}
        type="button"
        aria-label={`${isSaved ? 'Remove' : 'Add'} ${title} ${isSaved ? 'from' : 'to'} wishlist`}
        aria-pressed={isSaved}
        onClick={() => onToggleWishlist(movie)}
      >
        <i className={isSaved ? 'ri-bookmark-fill' : 'ri-bookmark-line'} aria-hidden="true" />
      </button>
    </article>
  )
}

export default MovieCard
