import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import '../style/home.scss'
import MovieCard from '../components/MovieCard.jsx'
import { useMovies } from '../hooks/useMovies.js'
import { getHomeData, getMovieGenres, getMovieImageUrl, getMovieYear, HOME_SHELVES } from '../utils/homeUtils.js'
import { useWishlist } from '../../shared/useWishlist.js'

const Home = () => {
  const { movies, sections, loading, error } = useMovies()
  const { wishlist, toggleWishlist } = useWishlist()
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [activeSlide, setActiveSlide] = useState(0)
  const {
    trendingMovie,
    latestMovies,
    topRatedMovies,
    featuredMovies,
    activeSlideIndex,
    activeMovie,
    availableGenres,
    trendingGenres,
    visibleMovies,
  } = getHomeData(movies, selectedGenre, activeSlide)
  useEffect(() => {
    if (featuredMovies.length < 2) return undefined

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % featuredMovies.length)
    }, 4000)

    return () => window.clearInterval(intervalId)
  }, [featuredMovies.length])

  return (
    <div className="movie-home-page">
      <div className="home-shell">
        <section className="hero-section">
          {activeMovie && (
            <div
              key={activeMovie.id}
              className="hero-poster"
              aria-hidden="true"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.12), rgba(5, 10, 18, 0.9)), url("${getMovieImageUrl(activeMovie.backdrop_path || activeMovie.poster_path)}")`,
              }}
            />
          )}
          <div className="hero-content">
            <div className="meta-strip">
              <span>{getMovieYear(activeMovie) || 'Featured'}</span>
              <span className="meta-dot" aria-hidden="true" />
              <span>{getMovieGenres(activeMovie || {}).slice(0, 2).join(' • ') || 'Discover'}</span>
              <span className="meta-dot" aria-hidden="true" />
              <span>{activeMovie?.runtime ? `${Math.floor(activeMovie.runtime / 60)}h ${activeMovie.runtime % 60}m` : 'Now showing'}</span>
            </div>

            <h1 className="hero-title">
              {activeMovie?.title || (loading ? 'Loading movies...' : error ? 'Movies unavailable' : 'Find your next favorite')}
            </h1>

            <p className="hero-copy">
              {activeMovie?.overview || error || 'Explore stories picked for your next movie night.'}
            </p>

            <div className="action-row">
              {activeMovie ? (
                <Link className="primary-btn" to={`/movie/${encodeURIComponent(activeMovie.id)}`} state={{ movie: activeMovie }}>
                  View Movie
                </Link>
              ) : (
                <Link className="primary-btn" to="#popular">View Movie</Link>
              )}
              <Link className="secondary-btn" to="/wishlist">＋ My List</Link>
            </div>

            <div className="trending-strip">
              <span className="trending-label">Trending</span>
              {trendingGenres.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
          {featuredMovies.length > 1 && (
            <div className="hero-pagination" role="group" aria-label="Featured movies">
              {featuredMovies.map((movie, index) => (
                <button
                  key={movie.id}
                  type="button"
                  className={`hero-dot${activeSlideIndex === index ? ' active' : ''}`}
                  aria-label={`Show ${movie.title}`}
                  aria-pressed={activeSlideIndex === index}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          )}
        </section>

        <main className="main-content">
          <div className="section-header" id="popular">
            <h2 className="section-title">Movies Popular Today</h2>
            <Link to="/discover" className="section-link">See all</Link>
          </div>

          <div className="genre-row">
            {['All', ...availableGenres].map((genre) => (
              <button
                key={genre}
                type="button"
                className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
                aria-pressed={selectedGenre === genre}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="movies-row">
            {visibleMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genres={getMovieGenres(movie)}
                isSaved={wishlist.some((savedMovie) => String(savedMovie.id) === String(movie.id))}
                onToggleWishlist={toggleWishlist}
              />
            ))}
            {loading && <p className="empty-state">Loading movies...</p>}
            {!loading && error && (
              <p className="empty-state" role="alert">{error}</p>
            )}
            {!loading && !error && visibleMovies.length === 0 && (
              <p className="empty-state">No popular movies in this genre yet.</p>
            )}
          </div>

          {HOME_SHELVES.map(({ key, title }) => {
            const shelfMovies = sections[key] || []

            return (
              <section className="movie-shelf" key={key} aria-labelledby={`${key}-title`}>
                <div className="section-header">
                  <h2 className="section-title" id={`${key}-title`}>{title}</h2>
                  <Link to="/discover" className="section-link">See all</Link>
                </div>

                <div className="movies-row">
                  {shelfMovies.slice(0, 20).map((movie) => (
                    <MovieCard
                      key={`${movie.media_type || key}-${movie.id}`}
                      movie={movie}
                      genres={getMovieGenres(movie)}
                      isSaved={wishlist.some((savedMovie) => String(savedMovie.id) === String(movie.id))}
                      onToggleWishlist={toggleWishlist}
                    />
                  ))}
                  {loading && <p className="empty-state">Loading titles...</p>}
                  {!loading && shelfMovies.length === 0 && (
                    <p className="empty-state">No titles available right now.</p>
                  )}
                </div>
              </section>
            )
          })}

          <div className="bottom-grid">
            <div className="panel">
              <div className="panel-header">
                <h3 className="panel-title">Not sure what to watch?</h3>
                <Link to="/recommend" className="section-link">Find a pick</Link>
              </div>

              <div className="recommendation-box">
                <div
                  className="recommendation-card"
                  style={{
                    background: trendingMovie?.poster_path
                      ? `linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(5, 10, 18, 0.8)), url("${getMovieImageUrl(trendingMovie.poster_path, 'w500')}") center/cover no-repeat`
                      : undefined,
                  }}
                >
                  <span className="mini-stat">★ {trendingMovie?.vote_average?.toFixed(1) ?? 'Pick for you'}</span>
                </div>

                <div className="recommendation-copy">
                  <h3>{trendingMovie?.title || 'What would you like to watch?'}</h3>
                  <p>
                    {trendingMovie?.overview || 'Choose a genre and explore a movie picked from your collection.'}
                  </p>
                  <Link className="mini-btn" to="/recommend">Explore</Link>
                </div>
              </div>
            </div>

            <div className="panel side-stack">
              <div className="watch-box">
                <h4>Top rated</h4>
                <p>{topRatedMovies[0]?.title || (loading ? 'Loading...' : 'No movies available')}</p>
                <div className="meter"><span /></div>
              </div>
              <div className="watch-box">
                <h4>Latest release</h4>
                <p>{latestMovies[0]?.title || (loading ? 'Loading...' : 'No movies available')}</p>
                <div className="meter"><span style={{ width: '62%' }} /></div>
              </div>
            </div>
          </div>
        </main>

        <footer className="footer">
          <div>© 2026 MovieRec</div>
          <div>Privacy • Terms • Help</div>
        </footer>
      </div>
    </div>
  )
}

export default Home