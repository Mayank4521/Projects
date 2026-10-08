const MovieCast = ({ cast = [] }) => (
  <div className="movie-cast-grid">
    {cast.map((person) => (
      <article className="movie-cast-card" key={person.name}>
        {person.portrait
          ? <img src={person.portrait} alt="" loading="lazy" />
          : <span className="movie-cast-initials" aria-hidden="true">{person.initials || person.name.slice(0, 1)}</span>}
        <strong>{person.name}</strong>
        <span>{person.character}</span>
      </article>
    ))}
  </div>
)

export default MovieCast
