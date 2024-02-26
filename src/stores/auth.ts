import jwtDecode from "jwt-decode";
import { computed, ref } from "vue";
import profile from "./profile";

class JwtDto {
  constructor(username: string, roles: string[], id: number, exp: number) {
    this.username = username;
    this.roles = roles;
    this.id = id;
    this.exp = exp;
  }
  username: string;
  roles: string[];
  id: number;
  exp: number;
}

const internalJwtDto = ref<JwtDto | null>(null);

const globalJwtDto = computed<JwtDto | null>(() => {
  if (internalJwtDto.value == null) {
    const dto = getJwtDto();
    internalJwtDto.value = dto;
  }
  return internalJwtDto.value;
});

const getJwtDto = (): JwtDto | null => {
  const token = getJwtToken();
  if (!token) return null;
  const dto = parseJwtToken(token);

  if (checkExp(dto)) {
    return dto;
  } else {
    setJwtToken(null);
    return null;
  }
};

const setJwtToken = (value: string | null) => {
  if (value) {
    localStorage.setItem("jwt", value);
    internalJwtDto.value = parseJwtToken(value);
  } else {
    localStorage.removeItem("jwt");
    profile.setProfile(null);
    internalJwtDto.value = null;
  }
};

const getJwtToken = (): string | null => {
  return localStorage.getItem("jwt");
};

const parseJwtToken = (value: string): JwtDto => {
  const token = jwtDecode(value) as any;
  const jwt = new JwtDto(token.Username, token.Roles, token.Id, token.exp);
  return jwt;
};

const checkExp = (value: JwtDto | null): boolean => {
  return value != null && value.exp * 1000 > Date.now();
};

const isLoggedIn = (): boolean => {
  if (checkExp(globalJwtDto.value)) return true;
  else {
    return false;
  }
};

const auth = {
  checkLogin: checkExp(globalJwtDto.value),
  isLoggedIn,
  jwtDto: globalJwtDto,
  getToken: getJwtToken,
  setToken: setJwtToken,
};

export default auth;
