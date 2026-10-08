const MovieConsensus = ({ movie }) => (
  <section className="movie-info-consensus">
    <div className="movie-consensus-heading">
      <div>
        <h2>Audience &amp; critic consensus</h2>
        <p>Tomatometer &amp; audience score</p>
      </div>
      <strong>{movie.critic_score || "—"}% critics</strong>
    </div>
    <div className="movie-consensus-content">
      <div className="movie-consensus-score">
        <span className="movie-score-ring"><i className="ri-star-fill" aria-hidden="true" /></span>
        <strong>{Number(movie.user_score || movie.vote_average).toFixed(1)}</strong>
        <small>Audience score</small>
      </div>
      <div className="movie-score-bars" aria-label="Audience score distribution">
        {[5, 14, 28, 53].map((score, index) => (
          <div className="movie-score-bar" key={index}>
            <span style={{ height: `${score}%` }} />
            <small>{["1–4", "5–6", "7–8", "9–10"][index]}</small>
          </div>
        ))}
      </div>
    </div>
    <p className="movie-review-quote">“A richly imagined cinematic journey, balancing spectacle with an intimate story about courage, loyalty, and the cost of destiny.”</p>
  </section>
)

export default MovieConsensus
