import jwtDecode, { type JwtPayload } from "jwt-decode"

interface JwtPayloadHelper extends JwtPayload {
  id: number
  role: string
}

const getToken = (): string | null => {
  const token = localStorage.getItem("jwt")
  if (!token) return null
  const decode = jwtDecode(token) as JwtPayloadHelper
  if ((decode.exp as number) * 1000 < Date.now()) {
    localStorage.removeItem("jwt")
    return null
  } else {
    return token
  }
}
const setToken = (value: string | null) => {
  if (!value) {
    localStorage.removeItem("jwt")
  } else {
    localStorage.setItem("jwt", value)
  }
}

const jwt = (): any | null => {
  const token = getToken()
  if (!token) return null
  const decode = jwtDecode(token)
  if (!token) return null
  return decode
}

const isLoggedIn = (): boolean => {
  if (getToken() && jwt()?.username) return true
  else return false
}

const auth = {
  token: getToken,
  jwt,
  isLoggedIn,
  setToken
}

export default auth
