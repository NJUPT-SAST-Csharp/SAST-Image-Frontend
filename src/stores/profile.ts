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

const profile = {
  getProfile,
  setProfile,
};

export type { ProfileContent };
export default profile;
