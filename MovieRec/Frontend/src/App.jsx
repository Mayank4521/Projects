import { RouterProvider } from "react-router"
import {router} from "./app.routes"
import { MovieContextProvider } from "./features/home/movie.context"
import { AuthProvider } from "./features/auth/auth.context.jsx"

const App = () => {
  return (
    <AuthProvider>
      <MovieContextProvider>
        <RouterProvider router={router} />
      </MovieContextProvider>
    </AuthProvider>
  )
}

export default App