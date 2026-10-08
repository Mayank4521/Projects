import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router"
import movieRecLogo from "../../assets/MovieRec-logo-hor.png"
import { useAuth } from "../auth/auth.context.jsx"
import "./navbar.scss"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
  const accountMenuRef = useRef(null)
  const { user, endDemoSession } = useAuth()
  const navigate = useNavigate()
  const userInitial = user?.name?.trim().charAt(0).toUpperCase() || "A"

  useEffect(() => {
    let currentlyScrolled = window.scrollY > 48
    setIsScrolled(currentlyScrolled)

    const updateScrollState = () => {
      const nextScrolled = currentlyScrolled ? window.scrollY > 12 : window.scrollY > 48
      if (nextScrolled === currentlyScrolled) return

      currentlyScrolled = nextScrolled
      setIsScrolled(nextScrolled)
    }

    window.addEventListener("scroll", updateScrollState, { passive: true })

    return () => window.removeEventListener("scroll", updateScrollState)
  }, [])

  useEffect(() => {
    if (!isMenuOpen && !isAccountMenuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
        setIsAccountMenuOpen(false)
      }
    }

    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [isMenuOpen, isAccountMenuOpen])

  useEffect(() => {
    if (!isAccountMenuOpen) return undefined

    const closeOnOutsideClick = (event) => {
      if (!accountMenuRef.current?.contains(event.target)) setIsAccountMenuOpen(false)
    }

    document.addEventListener("pointerdown", closeOnOutsideClick)
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick)
  }, [isAccountMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)
  const closeMenus = () => {
    setIsMenuOpen(false)
    setIsAccountMenuOpen(false)
  }
  const handleLogout = () => {
    endDemoSession()
    closeMenus()
    navigate("/")
  }

  return (
    <header className={`topbar${isScrolled ? " is-scrolled" : ""}${isMenuOpen ? " menu-open" : ""}`}>
      <Link className="brand-wrap" to="/" aria-label="MovieRec home">
        <img className="brand-logo" src={movieRecLogo} alt="MovieRec" />
      </Link>

      <nav id="primary-navigation" className={`main-nav${isMenuOpen ? " is-open" : ""}`} aria-label="Main navigation">
        <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
        <NavLink to="/discover" end onClick={closeMenu}>Discover</NavLink>
        <NavLink to="/wishlist" end onClick={closeMenu}>Wishlist</NavLink>
        <NavLink to="/recommend" end onClick={closeMenu}>Recommendation</NavLink>
      </nav>

      <div className="nav-actions">
        <div className="account-menu-wrap" ref={accountMenuRef}>
          <button
            className="user-pill"
            type="button"
            aria-label="Open account menu"
            aria-haspopup="menu"
            aria-controls="account-menu"
            aria-expanded={isAccountMenuOpen}
            title="Account menu"
            onClick={() => {
              setIsMenuOpen(false)
              setIsAccountMenuOpen((open) => !open)
            }}
          >
            {userInitial}
          </button>
          <div
            className={`account-menu${isAccountMenuOpen ? " is-open" : ""}`}
            id="account-menu"
            role="menu"
            aria-hidden={!isAccountMenuOpen}
          >
            <div className="account-menu-heading">
              <span className="account-menu-avatar" aria-hidden="true">{userInitial}</span>
              <span>
                <strong>{user?.name || "Welcome to MovieRec"}</strong>
                <small>{user?.email || "Your movie profile"}</small>
              </span>
            </div>
            <div className="account-menu-divider" />
            <Link className="account-menu-item" role="menuitem" to="/profile" onClick={closeMenus}>
              <i className="ri-user-3-line" aria-hidden="true" /> Profile
            </Link>
            <Link className="account-menu-item" role="menuitem" to="/login" onClick={closeMenus}>
              <i className="ri-login-box-line" aria-hidden="true" /> Login
            </Link>
            <Link className="account-menu-item" role="menuitem" to="/register" onClick={closeMenus}>
              <i className="ri-user-add-line" aria-hidden="true" /> Register
            </Link>
            <button className="account-menu-item account-menu-logout" role="menuitem" type="button" onClick={handleLogout}>
              <i className="ri-logout-box-r-line" aria-hidden="true" /> Logout
            </button>
          </div>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => {
            setIsAccountMenuOpen(false)
            setIsMenuOpen((open) => !open)
          }}
        >
          <i className={isMenuOpen ? "ri-close-line menu-icon" : "ri-menu-line menu-icon"} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}

export default Navbar
