import { getMovieImageUrl } from '../../home/utils/homeUtils.js'
import MovieDetailsLink from '../../shared/MovieDetailsLink.jsx'

const RecommendationResults = ({ title, description, movies }) => (
  <div className="recommendation-results" aria-live="polite">
    <div className="results-heading">
      <div>
        <p className="results-kicker"><span /> YOUR SHORTLIST</p>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="results-count">{movies.length} {movies.length === 1 ? 'film' : 'films'}</span>
    </div>
    <div className="result-grid">
      {movies.map((movie, index) => (
        <article className="result-card" key={movie.id}>
          <div className="result-poster">
            <MovieDetailsLink movie={movie} aria-label={`View ${movie.title} details`}>
              <img src={getMovieImageUrl(movie.poster_path, 'w500')} alt={`${movie.title} poster`} loading="lazy" />
            </MovieDetailsLink>
            <span className="result-rank">0{index + 1}</span>
            <span className="result-rating"><i className="ri-star-fill" aria-hidden="true" /> {movie.rating.toFixed(1)}</span>
          </div>
          <div className="result-copy">
            <p className="result-meta">{movie.year} <span>·</span> {movie.runtime} min <span>·</span> {movie.genres[0]}</p>
            <h4><MovieDetailsLink movie={movie}>{movie.title}</MovieDetailsLink></h4>
            <p className="result-reason">{movie.recommendationReason}</p>
            <div className="result-footer">
              <span>{movie.platforms[0]}</span>
              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} ${movie.year} trailer`)}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Search for the ${movie.title} trailer on YouTube`}
              >
                <i className="ri-play-circle-line" aria-hidden="true" /> Trailer
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
)

export default RecommendationResults