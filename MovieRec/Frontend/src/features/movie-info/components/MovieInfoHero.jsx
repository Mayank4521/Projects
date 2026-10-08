import { getMovieImageUrl } from "../../home/utils/homeUtils.js"
import { useWishlist } from "../../shared/useWishlist.js"

const formatRuntime = (runtime) => runtime
  ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
  : "Runtime unavailable"

const getBackdropUrl = (path) => path?.startsWith("http") ? path : getMovieImageUrl(path)

const MovieInfoHero = ({ movie }) => {
  const { wishlist, toggleWishlist } = useWishlist()
  const isSaved = wishlist.some((savedMovie) => String(savedMovie.id) === String(movie.id))

  return (
    <section
      className="movie-info-hero"
      style={{ "--movie-backdrop": `url("${getBackdropUrl(movie.backdrop_path || movie.poster_path)}")` }}
      aria-labelledby="movie-info-title"
    >
      <div className="movie-info-hero-content">
        <p className="movie-info-breadcrumb"><span>MovieRec</span><i className="ri-arrow-right-s-line" aria-hidden="true" /> {movie.genres?.[0] || "Featured film"}</p>
        <div className="movie-info-labels">
          <span>{movie.genres?.slice(0, 2).join(" · ") || "Cinema"}</span>
          <span>{movie.director || "MovieRec selection"}</span>
        </div>
        <h1 id="movie-info-title">{movie.title}</h1>
        <div className="movie-info-tagline">{movie.tagline || movie.overview}</div>
        <div className="movie-info-meta">
          <span className="movie-info-rating"><i className="ri-star-fill" aria-hidden="true" /> {Number(movie.user_score || movie.vote_average).toFixed(1)}</span>
          <span><i className="ri-thumb-up-fill" aria-hidden="true" /> {movie.critic_score || "—"}% critics</span>
          <span>{movie.release_date?.slice(0, 4) || "Year unknown"}</span>
          <span>{formatRuntime(movie.runtime)}</span>
          <span className="movie-info-certification">{movie.certification || "NR"}</span>
        </div>
        <div className="movie-info-actions">
          <a
            className="movie-info-primary"
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} official trailer`)}`}
            target="_blank"
            rel="noreferrer"
          >
            <i className="ri-play-fill" aria-hidden="true" /> Watch trailer
          </a>
          <button
            className={`movie-info-secondary${isSaved ? " is-saved" : ""}`}
            type="button"
            aria-pressed={isSaved}
            onClick={() => toggleWishlist(movie)}
          >
            <i className={isSaved ? "ri-bookmark-fill" : "ri-bookmark-line"} aria-hidden="true" />
            {isSaved ? "Added to Wishlist" : "Add to Wishlist"}
          </button>
        </div>
        <div className="movie-info-platforms">
          <span>Available on</span>
          {(movie.platforms || ["Streaming availability varies"]).map((platform) => <b key={platform}>{platform}</b>)}
        </div>
      </div>
    </section>
  )
}

export default MovieInfoHero
