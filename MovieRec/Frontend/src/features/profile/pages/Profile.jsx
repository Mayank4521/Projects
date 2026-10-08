import { Link } from "react-router"
import { useWishlist } from "../../shared/useWishlist.js"
import { useAuth } from "../../auth/auth.context.jsx"
import "./profile.scss"

const Profile = () => {
  const { wishlist } = useWishlist()
  const { user } = useAuth()
  const displayName = user?.name || "Alex Morgan"
  const watchedCount = wishlist.filter((movie) => movie.watched).length

  return (
    <main className="profile-page">
      <div className="profile-shell">
        <header className="profile-intro">
          <div>
            <p className="profile-eyebrow"><span /> YOUR MOVIEREC SPACE</p>
            <h1>Your profile</h1>
            <p className="profile-intro-copy">A little home for your movie taste and watchlist.</p>
          </div>
          <Link className="profile-discover-link" to="/discover">
            <i className="ri-compass-3-line" aria-hidden="true" />
            Explore movies
          </Link>
        </header>

        <section className="profile-hero" aria-labelledby="profile-name">
          <div className="profile-cover" aria-hidden="true">
            <span className="profile-cover-orb profile-cover-orb-one" />
            <span className="profile-cover-orb profile-cover-orb-two" />
            <i className="ri-film-line" />
          </div>
          <div className="profile-identity">
            <div className="profile-avatar" aria-label={`${displayName}'s profile image`}>
              <span>{displayName.trim().charAt(0).toUpperCase()}</span>
              <span className="profile-avatar-status" />
            </div>
            <div className="profile-name-block">
              <p className="profile-member-label"><i className="ri-sparkling-2-fill" aria-hidden="true" /> MOVIEREC MEMBER</p>
              <h2 id="profile-name">{displayName}</h2>
              <p>Finding the next great story, one film at a time.</p>
            </div>
            <div className="profile-member-since">
              <i className="ri-calendar-check-line" aria-hidden="true" />
              <span><small>MEMBER SINCE</small><strong>October 2024</strong></span>
            </div>
          </div>
        </section>

        <section className="profile-stats" aria-label="Your movie activity">
          <article className="profile-stat-card">
            <span className="profile-stat-icon profile-stat-icon-purple"><i className="ri-bookmark-3-line" aria-hidden="true" /></span>
            <span className="profile-stat-copy"><small>IN YOUR WISHLIST</small><strong>{wishlist.length}<em> titles</em></strong></span>
            <Link to="/wishlist" aria-label="View your wishlist"><i className="ri-arrow-right-up-line" aria-hidden="true" /></Link>
          </article>
          <article className="profile-stat-card">
            <span className="profile-stat-icon profile-stat-icon-green"><i className="ri-eye-line" aria-hidden="true" /></span>
            <span className="profile-stat-copy"><small>MARKED AS WATCHED</small><strong>{watchedCount}<em> titles</em></strong></span>
            <Link to="/wishlist" aria-label="View watched movies in your wishlist"><i className="ri-arrow-right-up-line" aria-hidden="true" /></Link>
          </article>
          <article className="profile-stat-card profile-stat-card-note">
            <span className="profile-stat-icon profile-stat-icon-gold"><i className="ri-movie-2-line" aria-hidden="true" /></span>
            <span className="profile-stat-copy"><small>YOUR MOVIE MOOD</small><strong>Story seeker</strong><small className="profile-coming-soon">Coming soon</small></span>
            <i className="ri-sparkling-line profile-stat-decoration" aria-hidden="true" />
          </article>
        </section>

        <div className="profile-content-grid">
          <section className="profile-panel profile-about-panel">
            <div className="profile-panel-heading">
              <div>
                <p>THE PERSON BEHIND THE PICKS</p>
                <h2>About your profile</h2>
              </div>
              <span className="profile-panel-heading-icon"><i className="ri-user-smile-line" aria-hidden="true" /></span>
            </div>
            <p className="profile-about-copy">Your MovieRec profile brings your saved films and movie activity together. Keep building your list and mark titles as watched to make this space yours.</p>
            <div className="profile-detail-list">
              <div><span><i className="ri-user-3-line" aria-hidden="true" /> Display name</span><strong>{displayName}</strong></div>
              <div><span><i className="ri-at-line" aria-hidden="true" /> Email</span><strong>{user?.email || "alexmorgan@example.com"}</strong></div>
              <div><span><i className="ri-heart-3-line" aria-hidden="true" /> Favorite genres</span><strong>Drama · Sci-fi · Adventure</strong></div>
            </div>
          </section>

          <section className="profile-panel profile-shortcuts-panel">
            <div className="profile-panel-heading">
              <div>
                <p>KEEP EXPLORING</p>
                <h2>Your MovieRec shortcuts</h2>
              </div>
              <span className="profile-panel-heading-icon profile-shortcuts-heading-icon"><i className="ri-flashlight-line" aria-hidden="true" /></span>
            </div>
            <Link className="profile-shortcut" to="/wishlist">
              <span className="profile-shortcut-icon"><i className="ri-bookmark-3-line" aria-hidden="true" /></span>
              <span><strong>Your wishlist</strong><small>Pick up where your watchlist left off</small></span>
              <i className="ri-arrow-right-line profile-shortcut-arrow" aria-hidden="true" />
            </Link>
            <Link className="profile-shortcut" to="/recommend">
              <span className="profile-shortcut-icon profile-shortcut-icon-gold"><i className="ri-magic-line" aria-hidden="true" /></span>
              <span><strong>Recommendations</strong><small>Find a film for your next movie night</small></span>
              <i className="ri-arrow-right-line profile-shortcut-arrow" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Profile