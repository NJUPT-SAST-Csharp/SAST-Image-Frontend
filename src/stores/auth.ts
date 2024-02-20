import jwtDecode from "jwt-decode"
import { ref } from "vue"

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

const globalJwtDto = ref<jwtDto | null>(null)

const getJwtDto = (): jwtDto | null => {
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
  if (value) {
    sessionStorage.setItem("jwt", value)
    globalJwtDto.value = parseJwtToken(value)
  } else {
    sessionStorage.removeItem("jwt")
    globalJwtDto.value = null
  }
}

const getJwtToken = (): string | null => {
  return sessionStorage.getItem("jwt")
}

const parseJwtToken = (value: string): jwtDto => {
  const token = jwtDecode(value) as any
  const jwt = new jwtDto(token.Username, token.Roles, token.Id, token.exp)
  return jwt
}

const checkExp = (value: jwtDto | null): boolean => {
  if (value == null) return false
  if (value.exp * 1000 > Date.now()) return true
  else return false
}

const isLoggedIn = (): boolean => {
  if (checkExp(globalJwtDto.value)) return true
  else {
    setJwtToken(null)
    return false
  }
}

const auth = {
  isLoggedIn,
  jwtDto: globalJwtDto,
  getToken: getJwtToken,
  setToken: setJwtToken
}

export default auth
