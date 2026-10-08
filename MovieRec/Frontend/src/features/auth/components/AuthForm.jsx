import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../auth.context.jsx"
import movieRecLogo from "../../../assets/MovieRec-logo-ver.png"
import "../style/auth.scss"

const getDisplayName = (email) => {
  const name = email.split("@")[0].split(/[._-]/).filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")

  return name || "Movie fan"
}

const AuthForm = ({ mode }) => {
  const isRegister = mode === "register"
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const { startDemoSession } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    startDemoSession({
      name: isRegister ? name.trim() : getDisplayName(email.trim()),
      email: email.trim(),
    })
    navigate("/profile")
  }

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <img className="auth-brand-logo" src={movieRecLogo} alt="MovieRec" />
        <h1 id="auth-title">{isRegister ? "Create your profile" : "Welcome back"}</h1>
        <p className="auth-description">
          {isRegister
            ? "Join MovieRec and keep your movie discoveries together."
            : "Sign in to pick up where your movie journey left off."}
        </p>

        <div className="auth-demo-notice" role="note">
          <i className="ri-information-line" aria-hidden="true" />
          <span>Demo mode only. Passwords are not saved, sent, or verified.</span>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label className="auth-field">
              <span>Display name</span>
              <span className="auth-input-wrap">
                <i className="ri-user-3-line" aria-hidden="true" />
                <input
                  autoComplete="name"
                  name="name"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="How should we call you?"
                  required
                  value={name}
                />
              </span>
            </label>
          )}
          <label className="auth-field">
            <span>Email address</span>
            <span className="auth-input-wrap">
              <i className="ri-mail-line" aria-hidden="true" />
              <input
                autoComplete="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </span>
          </label>
          <label className="auth-field">
            <span>Password <small>demo only</small></span>
            <span className="auth-input-wrap">
              <i className="ri-lock-2-line" aria-hidden="true" />
              <input
                autoComplete={isRegister ? "new-password" : "current-password"}
                name="password"
                placeholder="Enter any password"
                required
                type="password"
              />
            </span>
          </label>
          <button className="auth-submit" type="submit">
            {isRegister ? "Create demo profile" : "Continue in demo mode"}
            <i className="ri-arrow-right-line" aria-hidden="true" />
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? "Already have a profile?" : "New to MovieRec?"}
          {" "}
          <Link to={isRegister ? "/login" : "/register"}>
            {isRegister ? "Log in" : "Create an account"}
          </Link>
        </p>
        <Link className="auth-back-link" to="/">
          <i className="ri-arrow-left-line" aria-hidden="true" /> Back to MovieRec
        </Link>
      </section>
    </main>
  )
}

export default AuthForm
