import { useLocation, useParams } from "react-router"
import MovieCast from "../components/MovieCast.jsx"
import MovieConsensus from "../components/MovieConsensus.jsx"
import MovieInfoHero from "../components/MovieInfoHero.jsx"
import MovieInfoSection from "../components/MovieInfoSection.jsx"
import MovieInfoSidebar from "../components/MovieInfoSidebar.jsx"
import { getMovieInfo } from "../data/movieInfo.data.js"
import "./movie-info.scss"

const MovieInfo = () => {
  const { movieId } = useParams()
  const { state } = useLocation()
  const movie = getMovieInfo(state?.movie, movieId)

  if (!movie) {
    return (
      <main className="movie-info-page">
        <div className="movie-info-not-found">
          <i className="ri-film-line" aria-hidden="true" />
          <h1>Movie not found</h1>
          <p>We couldn’t find details for this title in the MovieRec catalog.</p>
          <a href="/discover">Explore movies</a>
        </div>
      </main>
    )
  }

  return (
    <main className="movie-info-page">
      <MovieInfoHero movie={movie} />
      <div className="movie-info-layout">
        <div className="movie-info-main-column">
          <MovieInfoSection title="Story & synopsis" subtitle="Official synopsis">
            <p className="movie-info-synopsis">{movie.synopsis || movie.overview}</p>
          </MovieInfoSection>

          {movie.cast?.length > 0 && (
            <MovieInfoSection
              title="Cast & visionaries"
              subtitle="The ensemble behind the story"
              action={<span className="movie-info-section-note">{movie.cast.length} featured cast</span>}
            >
              <MovieCast cast={movie.cast} />
            </MovieInfoSection>
          )}

          <MovieInfoSection title="Videos & media gallery" subtitle="Official clips and featurettes">
            <div className="movie-video-grid">
              {["Official final trailer", "Inside the film", "The making of the story"].map((video, index) => (
                <a
                  className={`movie-video-card movie-video-card-${index + 1}`}
                  key={video}
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} ${video}`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="movie-video-play"><i className="ri-play-fill" aria-hidden="true" /></span>
                  <strong>{video}</strong>
                </a>
              ))}
            </div>
          </MovieInfoSection>

          <MovieConsensus movie={movie} />
        </div>
        <MovieInfoSidebar movie={movie} />
      </div>
    </main>
  )
}

export default MovieInfo