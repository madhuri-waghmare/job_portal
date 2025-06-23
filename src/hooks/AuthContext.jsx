import { createContext, useState } from 'react'
import { supabase } from '../superbase/config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || null)
  


  const login = (userRole) => {
    setRole(userRole)
    localStorage.setItem('role', userRole)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setRole(null)
    localStorage.removeItem('role')
  }

  return (
    <AuthContext.Provider value={{ role,setRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
