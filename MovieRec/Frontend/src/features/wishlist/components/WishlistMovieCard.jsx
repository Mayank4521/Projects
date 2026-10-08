import { formatRuntime } from '../utils/wishlist.utils.js'
import MovieDetailsLink from '../../shared/MovieDetailsLink.jsx'

const WishlistMovieCard = ({ movie, onToggleWatched, onRemove }) => (
  <article className="wishlist-card">
    <div className="card-art">
      <MovieDetailsLink movie={movie} aria-label={`View ${movie.title} details`}>
        <img src={movie.poster} alt={`${movie.title} poster`} loading="lazy" />
      </MovieDetailsLink>
      {movie.watched && <span className="status-badge">Watched</span>}
      {movie.priority && !movie.watched && <span className="priority-badge">Priority</span>}
      <button
        className="remove-button"
        type="button"
        aria-label={`Remove ${movie.title} from wishlist`}
        onClick={() => onRemove(movie.id)}
      >×</button>
      <span className="rating-badge">★ {movie.rating.toFixed(1)}</span>
    </div>
    <div className="card-copy">
      <p className="added-label">{movie.added}</p>
      <h3 title={movie.title}><MovieDetailsLink movie={movie}>{movie.title}</MovieDetailsLink></h3>
      <p className="movie-meta">{movie.year} <span>·</span> {formatRuntime(movie.runtime)} <span>·</span> {movie.director}</p>
      <div className="movie-note">{movie.note}</div>
      <div className="card-actions">
        <button
          className={`watch-button${movie.priority ? ' priority-watch' : ''}`}
          type="button"
          onClick={() => onToggleWatched(movie.id)}
        >
          {movie.watched ? 'Mark unwatched' : `Watch on ${movie.platform}`}
        </button>
        <button
          className={`watched-toggle${movie.watched ? ' is-checked' : ''}`}
          type="button"
          aria-label={`Mark ${movie.title} ${movie.watched ? 'unwatched' : 'watched'}`}
          aria-pressed={movie.watched}
          onClick={() => onToggleWatched(movie.id)}
        >
          {movie.watched ? '✓' : ''}
        </button>
      </div>
    </div>
  </article>
)

export default WishlistMovieCard