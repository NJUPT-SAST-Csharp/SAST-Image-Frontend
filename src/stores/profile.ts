import { ref, type Ref } from "vue";

interface ProfileContent {
  username: string;
  nickname: string;
  biography: string;
  avatar: string | null;
  header: string | null;
  website: string | null;
  birthday: string | null;
}

const init = (): ProfileContent | null => {
  const profile = localStorage.getItem("profile");
  return profile ? JSON.parse(profile) : null;
};

const globalProfile = ref<ProfileContent | null>(init());

const getProfile = (): Ref<ProfileContent | null> => {
  return globalProfile;
};

function setProfile(profile: ProfileContent | null) {
  globalProfile.value = profile;
  if (profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
  } else {
    localStorage.removeItem("profile");
  }
}

function refresh() {
  const avatar = globalProfile.value?.avatar;
  const header = globalProfile.value?.header;
  globalProfile.value = init();
  if (avatar) {
    if (avatar.includes("?")) {
      globalProfile.value!.avatar = avatar.split("?")[0] + `?${Date.now()}`;
    } else {
      globalProfile.value!.avatar = avatar + `?${Date.now()}`;
    }
  }
  if (header) {
    if (header.includes("?")) {
      globalProfile.value!.header = header.split("?")[0] + `?${Date.now()}`;
    } else {
      globalProfile.value!.header = header + `?${Date.now()}`;
    }
  }
  setProfile(globalProfile.value);
}

const profile = {
  refresh,
  getProfile,
  setProfile,
};

export type { ProfileContent };
export default profile;
