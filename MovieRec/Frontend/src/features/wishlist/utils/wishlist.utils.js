import { INITIAL_WISHLIST_IDS, MOVIE_CATALOG } from "../../shared/movieCatalog.js"

export const MOCK_WISHLIST = MOVIE_CATALOG
	.filter((movie) => INITIAL_WISHLIST_IDS.includes(movie.id))
	.map((movie) => ({
		...movie,
		genre: movie.genres.join(" / "),
		platform: movie.platforms[0] || "Streaming availability varies",
		added: "In your wishlist",
		watched: false,
		priority: false,
		note: "Added to your MovieRec wishlist",
		poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
	}))

export const filterWishlistMovies = (movies, { filter = "all", search = "", sort = "added" } = {}) => {
	const normalizedSearch = search.trim().toLowerCase()
	const filteredMovies = movies.filter((movie) => {
		const matchesFilter = filter === "watched"
			? movie.watched
			: filter === "unwatched"
				? !movie.watched
				: filter === "priority"
					? movie.priority
					: true
		const searchableText = `${movie.title} ${movie.year} ${movie.genre} ${movie.director} ${movie.platform}`.toLowerCase()

		return matchesFilter && (!normalizedSearch || searchableText.includes(normalizedSearch))
	})

	return filteredMovies.sort((first, second) => {
		if (sort === "title") return first.title.localeCompare(second.title)
		if (sort === "rating") return second.rating - first.rating
		return movies.indexOf(first) - movies.indexOf(second)
	})
}

export const getWishlistStats = (movies) => ({
	total: movies.length,
	watched: movies.filter((movie) => movie.watched).length,
	unwatched: movies.filter((movie) => !movie.watched).length,
	priority: movies.filter((movie) => movie.priority).length,
	totalRuntime: movies.reduce((total, movie) => total + (Number(movie.runtime) || 0), 0),
})

export const formatRuntime = (minutes) => {
	const safeMinutes = Number.isFinite(Number(minutes)) ? Math.max(0, Number(minutes)) : 0
	const hours = Math.floor(safeMinutes / 60)
	const remainingMinutes = safeMinutes % 60

	return hours ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`
}
