import jwtDecode from "jwt-decode"

class jwtDto {
  constructor(username: string, roles: string[], id: number, exp: number) {
    this.username = username
    this.roles = roles
    this.id = id
    this.exp = exp
  }
  username: string
  roles: string[]
  id: number
  exp: number
}

const getJwt = (): jwtDto | null => {
  const token = getJwtToken()
  if (!token) return null
  const dto = parseJwtToken(token)

  if (checkExp(dto)) {
    return dto
  } else {
    setJwtToken(null)
    return null
  }
}

const setJwtToken = (value: string | null) => {
  if (value) sessionStorage.setItem("jwt", value)
  else sessionStorage.removeItem("jwt")
}

const getJwtToken = (): string | null => {
  return sessionStorage.getItem("jwt")
}

const parseJwtToken = (value: string): jwtDto => {
  const token = jwtDecode(value) as any
  const jwt = new jwtDto(token.Username, token.Roles, token.Id, token.exp)
  return jwt
}

const checkExp = (value: jwtDto): boolean => {
  if (value.exp * 1000 > Date.now()) return true
  else return false
}

const isLoggedIn = (): boolean => {
  if (getJwt()) return true
  else return false
}

const auth = {
  getJwt,
  isLoggedIn,
  getToken: getJwtToken,
  setToken: setJwtToken
}

export default auth
