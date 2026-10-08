import MovieDetailsLink from '../../shared/MovieDetailsLink.jsx'

const WishlistRecommendationCard = ({ recommendation, onAdd, isSaved = false }) => (
  <article className="suggestion-card">
    <MovieDetailsLink movie={recommendation} aria-label={`View ${recommendation.title} details`}>
      <img src={recommendation.poster} alt={`${recommendation.title} poster`} loading="lazy" />
    </MovieDetailsLink>
    <div>
      <span className="match-score">{recommendation.match}% match</span>
      <p className="suggestion-tag">{recommendation.tag}</p>
      <h3><MovieDetailsLink movie={recommendation}>{recommendation.title}</MovieDetailsLink></h3>
      <p>{recommendation.overview}</p>
    </div>
    <button type="button" disabled={isSaved} onClick={() => onAdd(recommendation)}>
      {isSaved ? '✓ In wishlist' : '＋ Add to wishlist'}
    </button>
  </article>
)

export default WishlistRecommendationCard