import React, { createContext, useState } from 'react'

export const Auth = createContext()

const readStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback
  } catch {
    return fallback
  }
}

export const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUser] = useState(
    readStorage('registerUser', [])
  )

  const savedUser = readStorage('loginUser', null)
  const [loggedInUser, setLoggedInUser] = useState(
    savedUser && savedUser.email ? savedUser : null
  )

  return (
    <Auth.Provider
      value={{ registeredUser, setRegisteredUser, loggedInUser, setLoggedInUser }}
    >
      {children}
    </Auth.Provider>
  )
}