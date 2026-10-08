const MovieInfoSection = ({ title, subtitle, action, children, className = "" }) => (
  <section className={`movie-info-section ${className}`.trim()}>
    <div className="movie-info-section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </section>
)

export default MovieInfoSection
