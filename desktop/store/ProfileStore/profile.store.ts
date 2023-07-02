import { createStore } from "solid-js/store";
import { IProfile } from "../../types/index.types";

const [profile, setProfileStore] = createStore<{ profile: IProfile | null }>({
  profile: null
});

export const getProfile = (): IProfile | null => profile.profile;

export const setProfile = (data: IProfile | null): void => { setProfileStore('profile', data) };

