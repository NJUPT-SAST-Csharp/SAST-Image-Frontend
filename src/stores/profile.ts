import { computed, ref, type Ref } from "vue";
import { defineStore } from "pinia";

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

function setProfile(profile: ProfileContent | null) {
  if (profile) {
    refreshUrl(profile);
    localStorage.setItem("profile", JSON.stringify(profile));
  } else {
    localStorage.removeItem("profile");
  }
  globalProfile.value = profile;
}

function refreshUrl(value: ProfileContent) {
  const avatar = value.avatar;
  const header = value.header;
  globalProfile.value = init();
  if (avatar) {
    value.avatar = avatar.split("?")[0] + `?${Date.now()}`;
  }
  if (header) {
    value.header = header.split("?")[0] + `?${Date.now()}`;
  }
}

const useProfileStore = defineStore("profile", () => {
  const username = computed(() => globalProfile.value?.username ?? null);
  const nickname = computed(() => globalProfile.value?.nickname ?? null);
  const biography = computed(() => globalProfile.value?.biography ?? null);
  const avatar = computed(() => globalProfile.value?.avatar ?? null);
  const header = computed(() => globalProfile.value?.header ?? null);
  const website = computed(() => globalProfile.value?.website ?? null);
  const birthday = computed(() => globalProfile.value?.birthday ?? null);

  return {
    setProfile,
    username,
    nickname,
    biography,
    avatar,
    header,
    website,
    birthday,
  };
});

export type { ProfileContent };
export default useProfileStore;
