import { setProfile } from "../../../store/ProfileStore/profile.store"
import { IProfile } from "../../../types/index.types";
import { ProfileController } from "../../http/controllers/ProfileController/profile.controller"

export const useUpdateProfile = (): () => Promise<IProfile | null> => {
  return async () => {
    try {
      const apiInstance = ProfileController.getInstance();
      const { data } = await apiInstance.getProfile();
      setProfile(data.data);
      return data.data;
    } catch (err) {
      setProfile(null);
      return null;
    }
  }
};
