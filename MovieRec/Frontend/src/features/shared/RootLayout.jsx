import { Outlet, useLocation } from "react-router"
import Navbar from "./Navbar.jsx"

const AUTH_PATHS = ["/login", "/register"]

const RootLayout = () => {
  const { pathname } = useLocation()
  const isAuthPage = AUTH_PATHS.includes(pathname)

  return (
    <>
      {!isAuthPage && <Navbar />}
      <Outlet />
    </>
  )
}

export default RootLayout