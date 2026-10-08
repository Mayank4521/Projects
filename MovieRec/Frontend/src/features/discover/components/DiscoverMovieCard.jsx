import { getMovieImageUrl } from '../../home/utils/homeUtils.js'
import MovieDetailsLink from '../../shared/MovieDetailsLink.jsx'

const DiscoverMovieCard = ({ movie, isSaved, onToggleSaved }) => (
  <article className="discover-card">
    <div className="discover-poster">
      <MovieDetailsLink movie={movie} className="discover-poster-link" aria-label={`View ${movie.title} details`}>
        <img src={getMovieImageUrl(movie.poster_path, 'w500')} alt={`${movie.title} poster`} loading="lazy" />
      </MovieDetailsLink>
      <span className="match-badge"><i className="ri-pulse-line" aria-hidden="true" /> {movie.match}% pulse</span>
      <button
        className={`save-movie${isSaved ? ' is-saved' : ''}`}
        type="button"
        aria-label={`${isSaved ? 'Remove' : 'Add'} ${movie.title} ${isSaved ? 'from' : 'to'} wishlist`}
        aria-pressed={isSaved}
        onClick={() => onToggleSaved(movie)}
      >
        <i className={isSaved ? 'ri-bookmark-fill' : 'ri-bookmark-line'} aria-hidden="true" />
      </button>
      <span className="poster-score"><i className="ri-star-fill" aria-hidden="true" /> {movie.rating.toFixed(1)}</span>
    </div>
    <MovieDetailsLink movie={movie} className="discover-card-copy discover-details-link">
      <div className="card-kicker"><span>{movie.year} · {movie.age}</span><span>{movie.genres[0]}</span></div>
      <h3 title={movie.title}>{movie.title}</h3>
      <p className="card-overview">{movie.overview}</p>
      <div className="card-footer">
        <div className="platform-badges" aria-label={`Available on ${movie.platforms.join(', ')}`}>
          {movie.platforms.slice(0, 2).map((platform) => (
            <span key={platform}>{platform === 'Prime Video' ? 'PRIME' : platform.replace(' Video', '').replace(' TV+', '')}</span>
          ))}
        </div>
        <span className="runtime-label">{movie.runtime} min</span>
      </div>
    </MovieDetailsLink>
  </article>
)

export default DiscoverMovieCard