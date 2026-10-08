import { useState } from 'react'
import MovieDetailsLink from '../../shared/MovieDetailsLink.jsx'
import { getMovieImageUrl } from '../../home/utils/homeUtils.js'
import { useWishlist } from '../../shared/useWishlist.js'
import DiscoverMovieCard from '../components/DiscoverMovieCard.jsx'
import {
  DISCOVER_GENRES,
  DISCOVER_MOVIES,
  FEATURED_DISCOVERY,
  filterDiscoverMovies,
  getGenreBreakdown,
} from '../utils/discover.utils.js'
import '../style/discover.scss'

const PAGE_SIZE = 8

const Discover = () => {
  const [category, setCategory] = useState('all')
  const [selectedGenres, setSelectedGenres] = useState([])
  const [query, setQuery] = useState('')
  const [activeQuery, setActiveQuery] = useState('')
  const [provider, setProvider] = useState('all')
  const [era, setEra] = useState('all')
  const [minimumRating, setMinimumRating] = useState('0')
  const [ageRating, setAgeRating] = useState('all')
  const [sort, setSort] = useState('popularity')
  const [view, setView] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const { wishlist, toggleWishlist } = useWishlist()
  const isSaved = (movieId) => wishlist.some((movie) => String(movie.id) === String(movieId))

  const filteredMovies = filterDiscoverMovies(DISCOVER_MOVIES, {
    category,
    genres: selectedGenres,
    search: activeQuery,
    provider,
    era,
    minimumRating,
    ageRating,
    sort,
  })
  const pageCount = Math.max(1, Math.ceil(filteredMovies.length / PAGE_SIZE))
  const pageMovies = filteredMovies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const genreBreakdown = getGenreBreakdown(filteredMovies)
  const featuredBackdrop = getMovieImageUrl(FEATURED_DISCOVERY.backdrop_path, 'w1280')

  const toggleGenre = (genre) => {
    setCurrentPage(1)
    setSelectedGenres((currentGenres) => currentGenres.includes(genre)
      ? currentGenres.filter((currentGenre) => currentGenre !== genre)
      : [...currentGenres, genre])
  }

  const clearFilters = () => {
    setCategory('all')
    setSelectedGenres([])
    setQuery('')
    setActiveQuery('')
    setProvider('all')
    setEra('all')
    setMinimumRating('0')
    setAgeRating('all')
    setSort('popularity')
    setCurrentPage(1)
  }

  const submitSearch = (event) => {
    event.preventDefault()
    setActiveQuery(query)
    setCurrentPage(1)
  }

  return (
    <main className="discover-page">
      <div className="discover-shell">
        <section className="featured-discovery" aria-labelledby="featured-title">
          <div
            className="featured-art"
            style={{ backgroundImage: `linear-gradient(90deg, rgba(7, 12, 21, 0.04), rgba(7, 12, 21, 0.12) 58%, rgba(7, 12, 21, 0.86)), url("${featuredBackdrop}")` }}
            role="img"
            aria-label={`${FEATURED_DISCOVERY.title} featured still`}
          >
            <span className="spotlight-tag"><i className="ri-sparkling-2-line" aria-hidden="true" /> Spotlight premiere of the week</span>
          </div>
          <div className="featured-copy">
            <div className="featured-meta">
              <span className="featured-quality">4K Atmos</span>
              <span>{FEATURED_DISCOVERY.genres.slice(0, 2).join(' · ')}</span>
              <span className="featured-rating"><i className="ri-star-fill" aria-hidden="true" /> {FEATURED_DISCOVERY.rating} IMDb</span>
              <span>{FEATURED_DISCOVERY.match}% match</span>
            </div>
            <h1 id="featured-title">
              <MovieDetailsLink movie={FEATURED_DISCOVERY}>{FEATURED_DISCOVERY.title}</MovieDetailsLink>
            </h1>
            <p className="featured-overview">“{FEATURED_DISCOVERY.overview}”</p>
            <p className="featured-byline">{FEATURED_DISCOVERY.director} <span>·</span> {FEATURED_DISCOVERY.year} <span>·</span> {FEATURED_DISCOVERY.runtime} min</p>
            <div className="featured-actions">
              <a
                className="discover-primary-button"
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(FEATURED_DISCOVERY.title + ' trailer')}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="ri-play-fill" aria-hidden="true" /> Watch trailer
              </a>
              <button className="discover-secondary-button" type="button" aria-pressed={isSaved(FEATURED_DISCOVERY.id)} onClick={() => toggleWishlist(FEATURED_DISCOVERY)}>
                <i className={isSaved(FEATURED_DISCOVERY.id) ? 'ri-bookmark-fill' : 'ri-bookmark-line'} aria-hidden="true" />
                {isSaved(FEATURED_DISCOVERY.id) ? 'Added to list' : 'Add to list'}
              </button>
              <span className="streaming-label">Stream on <b>MAX</b> <b className="streaming-4k">4K</b></span>
            </div>
          </div>
        </section>

        <section className="discover-controls" aria-label="Search and filter movies">
          <form className="discover-search" onSubmit={submitSearch}>
            <i className="ri-search-line" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search titles, genres, or directors"
              aria-label="Search movies"
            />
            {query && (
              <button className="clear-query" type="button" aria-label="Clear search" onClick={() => { setQuery(''); setActiveQuery(''); setCurrentPage(1) }}>
                  <i className="ri-close-line" aria-hidden="true" />
              </button>
            )}
            <button className="discover-submit" type="submit">Discover</button>
          </form>

          <div className="search-hints">
            <span>Try:</span>
              {['Denis Villeneuve', 'Sci-Fi', 'Anime', 'Psychological'].map((hint) => (
              <button key={hint} type="button" onClick={() => { setQuery(hint); setActiveQuery(hint); setCurrentPage(1) }}>{hint}</button>
            ))}
          </div>

          <div className="filter-grid">
            <label className="filter-field">
              <span>Streaming provider</span>
              <select value={provider} onChange={(event) => { setProvider(event.target.value); setCurrentPage(1) }}>
                <option value="all">All providers</option>
                <option value="Netflix">Netflix</option>
                <option value="Max">Max</option>
                <option value="Prime Video">Prime Video</option>
                <option value="Apple TV+">Apple TV+</option>
                <option value="Paramount+">Paramount+</option>
              </select>
            </label>
            <label className="filter-field">
              <span>Release era</span>
              <select value={era} onChange={(event) => { setEra(event.target.value); setCurrentPage(1) }}>
                <option value="all">Any release year</option>
                <option value="2020s">2020s (Modern)</option>
                <option value="2010s">2010s</option>
                <option value="classic">Before 2010</option>
              </select>
            </label>
            <label className="filter-field">
              <span>Minimum IMDb score</span>
              <select value={minimumRating} onChange={(event) => { setMinimumRating(event.target.value); setCurrentPage(1) }}>
                <option value="0">Any score</option>
                <option value="7">IMDb 7.0+</option>
                <option value="8">IMDb 8.0+</option>
                <option value="8.5">IMDb 8.5+</option>
              </select>
            </label>
            <label className="filter-field">
              <span>Age classification</span>
              <select value={ageRating} onChange={(event) => { setAgeRating(event.target.value); setCurrentPage(1) }}>
                <option value="all">All ratings</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="TV-14">TV-14</option>
                <option value="TV-MA">TV-MA</option>
              </select>
            </label>
          </div>

          <div className="genre-picker">
            <div className="genre-picker-heading">
              <span>Explore by genre spectrum</span>
              <button type="button" onClick={clearFilters}>Reset filters</button>
            </div>
            <div className="genre-options" role="group" aria-label="Filter by genre">
              {DISCOVER_GENRES.map((genre) => {
                const isActive = selectedGenres.includes(genre)
                return (
                  <button
                    key={genre}
                    type="button"
                    className={`genre-chip${isActive ? ' is-selected' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre === 'Sci-Fi' && <i className="ri-rocket-2-line" aria-hidden="true" />}
                    {genre === 'Psychological' && <i className="ri-brain-line" aria-hidden="true" />}
                    {genre !== 'Sci-Fi' && genre !== 'Psychological' && <i className="ri-movie-2-line" aria-hidden="true" />}
                    {genre}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section className="catalog-section" aria-labelledby="catalog-title">
          <div className="catalog-toolbar">
            <div className="catalog-heading">
              <span className="catalog-pulse" aria-hidden="true" />
              <h2 id="catalog-title">{filteredMovies.length} titles</h2>
              <span className="catalog-subtitle">in this discovery</span>
            </div>
            <div className="catalog-actions">
              <span className="affinity-status"><i className="ri-sparkling-2-line" aria-hidden="true" /> AI affinity calibrated</span>
              <div className="view-toggle" role="group" aria-label="Catalog layout">
                <button className={view === 'grid' ? 'is-active' : ''} type="button" aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>
                  <i className="ri-layout-grid-line" aria-hidden="true" />
                </button>
                <button className={view === 'list' ? 'is-active' : ''} type="button" aria-label="List view" aria-pressed={view === 'list'} onClick={() => setView('list')}>
                  <i className="ri-list-check-2" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="catalog-subtoolbar">
            <div className="category-tabs" role="group" aria-label="Title type">
              {[['all', 'All titles'], ['movie', 'Movies']].map(([value, label]) => (
                <button key={value} className={category === value ? 'is-active' : ''} type="button" aria-pressed={category === value} onClick={() => { setCategory(value); setCurrentPage(1) }}>
                  {label}
                </button>
              ))}
            </div>
            <label className="sort-field">
              <span>Sort</span>
              <select value={sort} onChange={(event) => { setSort(event.target.value); setCurrentPage(1) }}>
                <option value="popularity">MovieRec match</option>
                <option value="rating">Highest rated</option>
                <option value="newest">Newest releases</option>
              </select>
            </label>
          </div>

          {pageMovies.length ? (
            <div className={`discover-grid${view === 'list' ? ' is-list-view' : ''}`}>
              {pageMovies.map((movie) => (
                <DiscoverMovieCard
                  key={movie.id}
                  movie={movie}
                  isSaved={isSaved(movie.id)}
                  onToggleSaved={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="discover-empty">
              <i className="ri-search-eye-line" aria-hidden="true" />
              <h3>No titles match these filters</h3>
              <p>Adjust your search or clear a filter to explore more of the catalog.</p>
              <button type="button" onClick={clearFilters}>Clear all filters</button>
            </div>
          )}

          {filteredMovies.length > PAGE_SIZE && (
            <nav className="pagination" aria-label="Discovery pages">
              <button type="button" aria-label="Previous page" disabled={currentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>
                <i className="ri-arrow-left-s-line" aria-hidden="true" />
              </button>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                <button key={page} className={currentPage === page ? 'is-active' : ''} type="button" aria-current={currentPage === page ? 'page' : undefined} onClick={() => setCurrentPage(page)}>{page}</button>
              ))}
              <button type="button" aria-label="Next page" disabled={currentPage === pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}>
                <i className="ri-arrow-right-s-line" aria-hidden="true" />
              </button>
            </nav>
          )}
        </section>

        <section className="affinity-panel" aria-labelledby="affinity-title">
          <div className="affinity-copy">
            <p><i className="ri-bar-chart-grouped-line" aria-hidden="true" /> Catalog distribution</p>
            <h2 id="affinity-title">Matching density for your selected genres</h2>
            <span>Current query cross-references {filteredMovies.length} titles across {genreBreakdown.length} genre signals.</span>
          </div>
          <div className="affinity-chart" aria-label="Genre match strength">
            {genreBreakdown.map((genre) => (
              <div className="affinity-bar-item" key={genre.name}>
                <span>{genre.name}</span>
                <div className="affinity-track"><i style={{ width: `${genre.percentage}%` }} /></div>
                <b>{genre.count} {genre.count === 1 ? 'title' : 'titles'}</b>
              </div>
            ))}
            {!genreBreakdown.length && <p className="no-affinity">No genre matches to chart.</p>}
          </div>
          <div className="affinity-legend"><span>IMDb spectrum &gt; 7.0</span><span>Peak affinity: 8.0 - 8.9</span><span>Rare gems (9.0+)</span></div>
        </section>
      </div>
    </main>
  )
}

export default Discover