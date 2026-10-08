import MovieDetailsLink from "../../shared/MovieDetailsLink.jsx"
import { getMovieImageUrl } from "../../home/utils/homeUtils.js"

const MovieInfoSidebar = ({ movie }) => {
  const details = [
    ["Director", movie.director],
    ["Writers", movie.writers?.join(", ")],
    ["Original score", movie.original_score],
    ["Cinematography", movie.cinematography],
    ["Aspect ratio", movie.aspect_ratio],
    ["Production budget", movie.budget],
    ["Global box office", movie.box_office],
    ["Audio", movie.audio],
  ].filter(([, value]) => value)

  return (
    <aside className="movie-info-sidebar">
      <section className="movie-info-panel">
        <h2><i className="ri-clapperboard-line" aria-hidden="true" /> Production details</h2>
        <dl className="movie-production-list">
          {details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </section>

      {movie.genres_and_tropes?.length > 0 && (
        <section className="movie-info-panel">
          <h2><i className="ri-hashtag" aria-hidden="true" /> Genres &amp; tropes</h2>
          <div className="movie-trope-list">{movie.genres_and_tropes.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </section>
      )}

      {movie.similar?.length > 0 && (
        <section className="movie-info-panel">
          <h2><i className="ri-movie-2-line" aria-hidden="true" /> Similar movies</h2>
          <div className="similar-movie-list">
            {movie.similar.map((similarMovie) => (
              <MovieDetailsLink key={similarMovie.id} movie={similarMovie} className="similar-movie">
                <img src={getMovieImageUrl(similarMovie.poster_path, "w185")} alt="" loading="lazy" />
                <span><strong>{similarMovie.title}</strong><small>{similarMovie.year} · {similarMovie.director}</small></span>
                <b><i className="ri-star-fill" aria-hidden="true" /> {similarMovie.rating.toFixed(1)}</b>
              </MovieDetailsLink>
            ))}
          </div>
        </section>
      )}
    </aside>
  )
}

export default MovieInfoSidebar
