import { createBrowserRouter } from "react-router"
import Home from "./features/home/pages/Home"
import Discover from "./features/discover/pages/Discover.jsx"
import Wishlist from "./features/wishlist/pages/Wishlist.jsx"
import Recommend from "./features/recommendation/pages/Recommend.jsx"
import MovieInfo from "./features/movie-info/pages/MovieInfo.jsx"
import Profile from "./features/profile/pages/Profile.jsx"
import Login from "./features/auth/pages/Login.jsx"
import Register from "./features/auth/pages/Register.jsx"
import RootLayout from "./features/shared/RootLayout.jsx"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "discover", element: <Discover /> },
            { path: "wishlist", element: <Wishlist /> },
            { path: "recommend", element: <Recommend /> },
            { path: "profile", element: <Profile /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "movie/:movieId", element: <MovieInfo /> },
        ],
    }
])