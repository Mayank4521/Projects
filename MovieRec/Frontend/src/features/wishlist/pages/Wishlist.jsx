import { useState } from 'react'
import WishlistMovieCard from '../components/WishlistMovieCard.jsx'
import WishlistRecommendationCard from '../components/WishlistRecommendationCard.jsx'
import { filterWishlistMovies, formatRuntime, getWishlistStats } from '../utils/wishlist.utils.js'
import { MOVIE_CATALOG } from '../../shared/movieCatalog.js'
import { useWishlist } from '../../shared/useWishlist.js'
import '../style/wishlist.scss'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unwatched', label: 'Unwatched' },
  { id: 'watched', label: 'Watched' },
  { id: 'priority', label: 'High priority' },
]

const Wishlist = () => {
  const { wishlist: movies, addToWishlist, removeFromWishlist, toggleWatched } = useWishlist()
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('added')
  const stats = getWishlistStats(movies)
  const visibleMovies = filterWishlistMovies(movies, { filter: activeFilter, search, sort })
  const genreCounts = Object.entries(movies.flatMap((movie) => movie.genres || []).reduce((counts, genre) => {
    counts[genre] = (counts[genre] || 0) + 1
    return counts
  }, {})).sort((first, second) => second[1] - first[1]).slice(0, 4)
  const totalGenres = genreCounts.reduce((total, [, count]) => total + count, 0)
  const platformCounts = Object.entries(movies.flatMap((movie) => movie.platforms || []).reduce((counts, platform) => {
    counts[platform] = (counts[platform] || 0) + 1
    return counts
  }, {})).sort((first, second) => second[1] - first[1]).slice(0, 3)

  const recommendations = MOVIE_CATALOG
    .filter((movie) => !movies.some((savedMovie) => String(savedMovie.id) === String(movie.id)))
    .slice(0, 2)
    .map((movie) => ({
      ...movie,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      match: movie.match,
      tag: movie.genres.slice(0, 2).join(' / '),
    }))

  return (
    <div className="wishlist-page">
      <main className="wishlist-shell">
        <section className="wishlist-heading" aria-labelledby="wishlist-title">
          <div>
            <p className="wishlist-eyebrow"><span /> Personal archive / Vault #0492</p>
            <h1 id="wishlist-title">My Cinema Vault &amp; Wishlist</h1>
            <p className="wishlist-subtitle">
              {stats.total} movies saved <span>·</span> {stats.watched} watched
            </p>
            <p className="runtime-line">Estimated total watch time: <strong>{formatRuntime(stats.totalRuntime)}</strong></p>
          </div>
        </section>

        <section className="insight-grid" aria-label="Wishlist insights">
          <div className="insight-panel taste-panel">
            <div className="panel-heading">
              <h2><span className="orbit-icon" aria-hidden="true">◉</span> Curated taste matrix</h2>
              <span className="panel-kicker">From your saved movies</span>
            </div>
            {genreCounts.length > 0 && (
              <div className="taste-meter" aria-label="Genre distribution in your wishlist">
                {genreCounts.map(([genre, count], index) => (
                  <span
                    className={`meter-slice meter-slice-${index}`}
                    key={genre}
                    style={{ width: `${(count / totalGenres) * 100}%` }}
                  />
                ))}
              </div>
            )}
            <div className="taste-legend">
              {genreCounts.map(([genre, count], index) => (
                <span key={genre}>
                  <i className={`legend-slice legend-slice-${index}`} />{Math.round((count / (totalGenres || 1)) * 100)}% {genre}
                  <small>{count} {count === 1 ? 'movie' : 'movies'}</small>
                </span>
              ))}
              {genreCounts.length === 0 && <span>No saved movies yet</span>}
            </div>
          </div>

          <div className="insight-panel stream-panel">
            <div className="panel-heading">
              <h2><span className="screen-icon" aria-hidden="true">▣</span> Where to stream</h2>
              <span className="ready-pill">{stats.unwatched} ready to play</span>
            </div>
            <div className="stream-list">
              {platformCounts.map(([platform, count], index) => (
                <div key={platform}>
                  <span className="stream-name">{platform} <i className={`provider-dot provider-dot-${index}`} /></span>
                  <strong>{count}</strong>
                  <small>{count === 1 ? 'saved movie' : 'saved movies'}</small>
                </div>
              ))}
              {platformCounts.length === 0 && <p>No streaming details yet.</p>}
            </div>
          </div>
        </section>

        <section className="queue-section" aria-labelledby="queue-title">
          <div className="queue-heading">
            <div className="queue-title-wrap">
              <h2 id="queue-title">Active queue</h2>
              <span className="display-count">{visibleMovies.length} displayed</span>
            </div>
            <label className="sort-control">
              <span>Sort by</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="added">Date added (newest)</option>
                <option value="title">Title (A-Z)</option>
                <option value="rating">Rating (highest)</option>
              </select>
            </label>
          </div>

          <div className="queue-controls">
            <div className="filter-tabs" role="group" aria-label="Filter wishlist">
              {FILTERS.map(({ id, label }) => {
                const count = id === 'all' ? stats.total
                  : id === 'unwatched' ? stats.unwatched
                    : id === 'watched' ? stats.watched : stats.priority

                return (
                  <button
                    key={id}
                    className={`filter-tab${activeFilter === id ? ' is-active' : ''}`}
                    type="button"
                    aria-pressed={activeFilter === id}
                    onClick={() => setActiveFilter(id)}
                  >
                    {label} <span>{count}</span>
                  </button>
                )
              })}
            </div>
            <label className="wishlist-search">
              <span className="search-glyph" aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your vault"
                aria-label="Search wishlist"
              />
            </label>
          </div>

          {visibleMovies.length ? (
            <div className="wishlist-grid">
              {visibleMovies.map((movie) => (
                <WishlistMovieCard
                  key={movie.id}
                  movie={movie}
                  onToggleWatched={toggleWatched}
                  onRemove={removeFromWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="empty-wishlist">
              <span aria-hidden="true">⌕</span>
              <h3>No movies found</h3>
              <p>Try another search or choose a different queue filter.</p>
              <button type="button" onClick={() => { setSearch(''); setActiveFilter('all') }}>Show all movies</button>
            </div>
          )}
        </section>

        <section className="recommendation-panel" aria-labelledby="recommendation-title">
          <div className="recommendation-heading">
            <div className="recommendation-heading-copy">
              <p className="recommendation-eyebrow">✦ MovieRec picks <span>From the shared movie catalog</span></p>
              <h2 id="recommendation-title">More movies to add to your list</h2>
              <p>Discover another film from the same catalog used across MovieRec.</p>
            </div>
          </div>
          <div className="recommendation-list">
            {recommendations.map((recommendation) => (
              <WishlistRecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
                isSaved={movies.some((movie) => String(movie.id) === String(recommendation.id))}
                onAdd={addToWishlist}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Wishlist