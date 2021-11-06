import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth, provider } from './firebase'
import { useState } from 'react'

export const login = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    console.log(result)
    return result
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const getSession = () => auth.currentUser

export const useSession = () => {
  const [user, setUser] = useState(undefined)
  onAuthStateChanged(auth, (usr) => {
    setUser(usr)
  })
  return user
}
export const logout = () => auth.signOut()
