export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

const GENRE_NAMES = {
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	99: 'Documentary',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Science Fiction',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western',
	10759: 'Action & Adventure',
	10762: 'Kids',
	10763: 'News',
	10764: 'Reality',
	10765: 'Sci-Fi & Fantasy',
	10766: 'Soap',
	10767: 'Talk',
	10768: 'War & Politics',
}

export const HOME_SHELVES = [
	{ key: 'trending', title: 'Trending Worldwide' },
	{ key: 'comedy', title: 'Comedy Hits' },
	{ key: 'topRated', title: 'Top Rated Movies' },
	{ key: 'hollywood', title: 'Hollywood Cinema' },
]

export const getMovieGenres = (movie) =>
	(movie?.genre_ids || []).map((genreId) => GENRE_NAMES[genreId]).filter(Boolean)

export const getMovieYear = (movie) => movie?.release_date?.slice(0, 4)

export const getMovieImageUrl = (path, size = 'original') =>
	path ? `${TMDB_IMAGE_BASE_URL}${size}${path}` : null

export const getHomeData = (movies, selectedGenre, activeSlide) => {
	const movieList = Array.isArray(movies) ? movies : []
	const trendingMovie = movieList[0]
	const latestMovies = [...movieList].sort((first, second) =>
		String(second.release_date || '').localeCompare(String(first.release_date || '')),
	)
	const topRatedMovies = [...movieList].sort(
		(first, second) => (second.vote_average || 0) - (first.vote_average || 0),
	)
	const featuredMovies = []

	for (let index = 0; index < movieList.length && featuredMovies.length < 5; index += 1) {
		for (const movie of [latestMovies[index], topRatedMovies[index]]) {
			if (
				movie &&
				featuredMovies.length < 5 &&
				!featuredMovies.some((featuredMovie) => featuredMovie.id === movie.id)
			) {
				featuredMovies.push(movie)
			}
		}
	}

	const activeSlideIndex = featuredMovies.length ? activeSlide % featuredMovies.length : 0
	const popularMovies = movieList
	const availableGenres = [...new Set(popularMovies.flatMap(getMovieGenres))]
	const trendingGenres = [...new Set(movieList.slice(0, 5).flatMap(getMovieGenres))].slice(0, 4)
	const visibleMovies = selectedGenre === 'All'
		? popularMovies
		: popularMovies.filter((movie) => getMovieGenres(movie).includes(selectedGenre))

	return {
		trendingMovie,
		latestMovies,
		topRatedMovies,
		featuredMovies,
		activeSlideIndex,
		activeMovie: featuredMovies[activeSlideIndex] || trendingMovie,
		availableGenres,
		trendingGenres,
		visibleMovies,
	}
}
