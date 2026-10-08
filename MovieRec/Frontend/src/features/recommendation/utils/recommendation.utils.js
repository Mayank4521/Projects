import { DISCOVER_MOVIES } from '../../discover/utils/discover.utils.js'

export const RECOMMENDATION_MOODS = [
  { id: 'thoughtful', label: 'Thoughtful & reflective', genres: ['Drama', 'Mystery', 'Sci-Fi', 'Psychological'] },
  { id: 'suspenseful', label: 'Tense & suspenseful', genres: ['Thriller', 'Mystery', 'Crime', 'Neo-Noir', 'Psychological'] },
  { id: 'wonder', label: 'Curious & full of wonder', genres: ['Sci-Fi', 'Fantasy', 'Adventure', 'Anime', 'Hard Sci-Fi'] },
  { id: 'restless', label: 'Restless & high-energy', genres: ['Action', 'Adventure', 'Thriller', 'Crime', 'Music'] },
]

export const EXPRESSIONS = [
  { id: 'curious', label: 'Curious', description: 'Something to wonder about', icon: 'ri-eye-line', mood: 'wonder' },
  { id: 'thoughtful', label: 'Thoughtful', description: 'A story that lingers', icon: 'ri-moon-clear-line', mood: 'thoughtful' },
  { id: 'on-edge', label: 'On edge', description: 'Keep me guessing', icon: 'ri-flashlight-line', mood: 'suspenseful' },
  { id: 'restless', label: 'Restless', description: 'Give me some momentum', icon: 'ri-windy-line', mood: 'restless' },
]

export const getAnswerRecommendations = ({ genre, mood, runtime }) => {
  const selectedMood = RECOMMENDATION_MOODS.find((option) => option.id === mood) || RECOMMENDATION_MOODS[0]

  return DISCOVER_MOVIES
    .map((movie) => {
      const hasGenre = genre === 'all' || movie.genres.includes(genre)
      const hasMood = movie.genres.some((movieGenre) => selectedMood.genres.includes(movieGenre))
      const fitsRuntime = runtime === 'any'
        || (runtime === 'short' && movie.runtime < 120)
        || (runtime === 'long' && movie.runtime >= 120)
      const score = Number(hasGenre) * 5 + Number(hasMood) * 3 + Number(fitsRuntime) * 2 + movie.rating / 10

      return {
        ...movie,
        recommendationReason: genre !== 'all' && hasGenre
          ? `A ${genre} pick with a ${selectedMood.label.toLowerCase()} feel.`
          : hasMood
            ? `Its ${movie.genres.slice(0, 2).join(' and ')} mix suits a ${selectedMood.label.toLowerCase()} night.`
            : 'A highly rated pick from the MovieRec catalog.',
        score,
      }
    })
    .sort((first, second) => second.score - first.score)
    .slice(0, 3)
}

export const getExpressionRecommendations = (expression) => {
  const selectedExpression = EXPRESSIONS.find((option) => option.id === expression) || EXPRESSIONS[0]
  const mood = RECOMMENDATION_MOODS.find((option) => option.id === selectedExpression.mood)

  return getAnswerRecommendations({ genre: 'all', mood: mood.id, runtime: 'any' })
    .map((movie) => ({
      ...movie,
      recommendationReason: `A ${movie.genres.slice(0, 2).join(' and ')} story for a night that feels ${selectedExpression.label.toLowerCase()}.`,
    }))
}