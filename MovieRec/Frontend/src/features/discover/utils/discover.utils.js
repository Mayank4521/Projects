import { FEATURED_MOVIE, MOVIE_CATALOG } from '../../shared/movieCatalog.js'

export const FEATURED_DISCOVERY = FEATURED_MOVIE
export const DISCOVER_MOVIES = MOVIE_CATALOG
export const DISCOVER_GENRES = [...new Set(MOVIE_CATALOG.flatMap((movie) => movie.genres))]

export const filterDiscoverMovies = (movies, filters = {}) => {
  const {
    category = 'all',
    genres = [],
    search = '',
    provider = 'all',
    era = 'all',
    minimumRating = 0,
    ageRating = 'all',
    sort = 'popularity',
  } = filters
  const normalizedSearch = search.trim().toLowerCase()

  return movies
    .filter((movie) => category === 'all' || movie.format === category)
    .filter((movie) => !genres.length || genres.some((genre) => movie.genres.includes(genre)))
    .filter((movie) => provider === 'all' || movie.platforms.includes(provider))
    .filter((movie) => {
      if (era === 'all') return true
      if (era === '2020s') return movie.year >= 2020
      if (era === '2010s') return movie.year >= 2010 && movie.year < 2020
      return movie.year < 2010
    })
    .filter((movie) => movie.rating >= Number(minimumRating))
    .filter((movie) => ageRating === 'all' || movie.age === ageRating)
    .filter((movie) => {
      if (!normalizedSearch) return true
      const searchableText = `${movie.title} ${movie.director} ${movie.genres.join(' ')} ${movie.overview}`.toLowerCase()
      return searchableText.includes(normalizedSearch)
    })
    .sort((first, second) => {
      if (sort === 'rating') return second.rating - first.rating
      if (sort === 'newest') return second.year - first.year || second.rating - first.rating
      return second.match - first.match
    })
}

export const getGenreBreakdown = (movies) => {
  const genreTotals = movies.flatMap((movie) => movie.genres).reduce((totals, genre) => {
    totals[genre] = (totals[genre] || 0) + 1
    return totals
  }, {})
  const genres = Object.entries(genreTotals).sort((first, second) => second[1] - first[1]).slice(0, 4)
  const highestCount = genres[0]?.[1] || 1

  return genres.map(([name, count]) => ({ name, count, percentage: Math.round((count / highestCount) * 100) }))
}