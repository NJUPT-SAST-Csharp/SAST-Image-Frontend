import jwtDecode from "jwt-decode";
import { computed, ref } from "vue";
import { defineStore } from "pinia";

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

const parseJwtToken = (value: string): JwtDto => {
  const token = jwtDecode(value) as any;
  const jwt = new JwtDto(token.Username, token.Roles, token.Id, token.exp);
  return jwt;
};

const fetchFromStorage = () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) return null;
  else return parseJwtToken(jwt);
};

const jwtDto = ref<JwtDto | null>(fetchFromStorage());
const token = ref<string | null>(localStorage.getItem("jwt"));

const getJwtDto = computed((): JwtDto | null => {
  if (jwtDto.value == null) {
    jwtDto.value = fetchFromStorage();
  }
  if (checkExp(jwtDto.value)) return jwtDto.value;
  else {
    setJwtToken(null);
    return null;
  }
});

const setJwtToken = (value: string | null) => {
  if (value) {
    localStorage.setItem("jwt", value);
    token.value = value;
    jwtDto.value = parseJwtToken(value);
  } else {
    localStorage.removeItem("jwt");
    token.value = null;
    jwtDto.value = null;
  }
};

const getJwtToken = () => {
  if (!token.value) {
    token.value = localStorage.getItem("jwt");
  }
  return token.value;
};

const checkExp = (value: JwtDto | null): boolean => {
  return value != null && value.exp * 1000 > Date.now();
};

const isLoggedIn = computed(() => {
  if (checkExp(getJwtDto.value)) return true;
  else {
    return false;
  }
});

const useAuthStore = defineStore("auth", () => {
  const username = computed(() => getJwtDto.value?.username ?? null);
  const roles = computed(() => getJwtDto.value?.roles ?? null);
  const id = computed(() => getJwtDto.value?.id ?? null);

  return {
    isLoggedIn,
    username,
    roles,
    id,
    getToken: getJwtToken,
    setToken: setJwtToken,
  };
});

export default useAuthStore;
