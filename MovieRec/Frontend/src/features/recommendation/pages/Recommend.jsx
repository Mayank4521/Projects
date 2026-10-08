import { useState } from 'react'
import { Link } from 'react-router'
import RecommendationResults from '../components/RecommendationResults.jsx'
import { DISCOVER_GENRES } from '../../discover/utils/discover.utils.js'
import {
  EXPRESSIONS,
  RECOMMENDATION_MOODS,
  getAnswerRecommendations,
  getExpressionRecommendations,
} from '../utils/recommendation.utils.js'
import '../style/recommendation.scss'

const Recommend = () => {
  const [answers, setAnswers] = useState({ genre: 'all', mood: 'thoughtful', runtime: 'any' })
  const [expression, setExpression] = useState('curious')
  const [answerResults, setAnswerResults] = useState(null)
  const [expressionResults, setExpressionResults] = useState(null)

  const submitAnswers = (event) => {
    event.preventDefault()
    setAnswerResults(getAnswerRecommendations(answers))
  }

  const submitExpression = (event) => {
    event.preventDefault()
    setExpressionResults(getExpressionRecommendations(expression))
  }

  return (
    <main className="recommendation-page">
      <div className="recommendation-shell">
        <header className="recommendation-intro">
          <p className="recommendation-eyebrow"><span aria-hidden="true" /> YOUR NEXT FILM, CONSIDERED</p>
          <div className="recommendation-title-row">
            <div>
              <h1>Find a film for the feeling.</h1>
              <p>Choose a few preferences or the mood you're in. We'll look through the MovieRec catalog and show you a considered shortlist.</p>
            </div>
            <nav className="recommendation-jump-links" aria-label="Recommendation methods">
              <Link to="#answer-path"><i className="ri-chat-1-line" aria-hidden="true" /> By your answers</Link>
              <Link to="#expression-path"><i className="ri-emotion-line" aria-hidden="true" /> By expression</Link>
            </nav>
          </div>
        </header>

        <section className="recommendation-path" id="answer-path" aria-labelledby="answer-title">
          <div className="path-heading">
            <span className="path-index">01</span>
            <div>
              <p className="path-kicker">A SHORT BRIEF</p>
              <h2 id="answer-title">Based on your answers</h2>
              <p>Tell us what kind of night you're planning.</p>
            </div>
          </div>

          <form className="answer-form" onSubmit={submitAnswers}>
            <label className="recommendation-field">
              <span>What sounds good?</span>
              <select
                value={answers.genre}
                onChange={(event) => setAnswers((current) => ({ ...current, genre: event.target.value }))}
              >
                <option value="all">Surprise me</option>
                {DISCOVER_GENRES.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
              </select>
            </label>
            <label className="recommendation-field">
              <span>Pick the atmosphere</span>
              <select
                value={answers.mood}
                onChange={(event) => setAnswers((current) => ({ ...current, mood: event.target.value }))}
              >
                {RECOMMENDATION_MOODS.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
              </select>
            </label>
            <label className="recommendation-field">
              <span>How much time do you have?</span>
              <select
                value={answers.runtime}
                onChange={(event) => setAnswers((current) => ({ ...current, runtime: event.target.value }))}
              >
                <option value="any">Any runtime</option>
                <option value="short">Under 2 hours</option>
                <option value="long">A longer watch</option>
              </select>
            </label>
            <button className="recommendation-submit" type="submit">
              <i className="ri-movie-2-line" aria-hidden="true" /> Find my film
            </button>
          </form>

          {answerResults && (
            <RecommendationResults
              title="Your answer-based shortlist"
              description="Picked from the catalog using the preferences you selected."
              movies={answerResults}
            />
          )}
        </section>

        <section className="recommendation-path expression-path" id="expression-path" aria-labelledby="expression-title">
          <div className="path-heading">
            <span className="path-index path-index-lilac">02</span>
            <div>
              <p className="path-kicker">GO WITH YOUR GUT</p>
              <h2 id="expression-title">By your expression</h2>
              <p>Choose the feeling that's closest. No camera or facial analysis is used.</p>
            </div>
          </div>

          <form className="expression-form" onSubmit={submitExpression}>
            <fieldset className="expression-options">
              <legend>What are you feeling?</legend>
              {EXPRESSIONS.map(({ id, label, description, icon }) => (
                <label className={`expression-option${expression === id ? ' is-selected' : ''}`} key={id}>
                  <input
                    type="radio"
                    name="expression"
                    value={id}
                    checked={expression === id}
                    onChange={() => setExpression(id)}
                  />
                  <span className="expression-icon"><i className={icon} aria-hidden="true" /></span>
                  <span className="expression-copy"><strong>{label}</strong><small>{description}</small></span>
                  <span className="expression-check" aria-hidden="true"><i className="ri-check-line" /></span>
                </label>
              ))}
            </fieldset>
            <div className="expression-submit-wrap">
              <p><i className="ri-shield-check-line" aria-hidden="true" /> Your mood choice stays in this page.</p>
              <button className="recommendation-submit expression-submit" type="submit">
                <i className="ri-sparkling-2-line" aria-hidden="true" /> Show expression picks
              </button>
            </div>
          </form>

          {expressionResults && (
            <RecommendationResults
              title="A shortlist for this mood"
              description="A few films from the catalog that share the tone you picked."
              movies={expressionResults}
            />
          )}
        </section>

        <footer className="recommendation-footer">
          <span>CURATED FROM THE MOVIEREC CATALOG</span>
          <Link to="/discover">Browse all titles <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
        </footer>
      </div>
    </main>
  )
}

export default Recommend