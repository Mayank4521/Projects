import { createContext, useContext, useState } from "react"

const DEMO_NAME_KEY = "movierec-demo-name"
const DEMO_EMAIL_KEY = "movierec-demo-email"

const getInitialUser = () => {
  const name = sessionStorage.getItem(DEMO_NAME_KEY)
  const email = sessionStorage.getItem(DEMO_EMAIL_KEY)

  return name && email ? { name, email } : null
}

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser)

  const startDemoSession = ({ name, email }) => {
    const demoUser = { name, email }
    sessionStorage.setItem(DEMO_NAME_KEY, name)
    sessionStorage.setItem(DEMO_EMAIL_KEY, email)
    setUser(demoUser)
  }

  const endDemoSession = () => {
    sessionStorage.removeItem(DEMO_NAME_KEY)
    sessionStorage.removeItem(DEMO_EMAIL_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, startDemoSession, endDemoSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}
