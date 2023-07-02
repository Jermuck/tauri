import { useNavigate } from "@solidjs/router";
import { Accessor, createSignal } from "solid-js";
import { setProfile } from "../../../../store/ProfileStore/profile.store";
import { AxiosError } from "../../../../types/index.types";
import { ProfileController } from "../../../http/controllers/ProfileController/profile.controller";
import { IUserSettings } from "../UserSettings";

interface IUseUserSettings {
  getError: Accessor<string | null>;
  update: (data: IUserSettings) => Promise<void>;
};

export const useUpdateUserSettings = (): IUseUserSettings => {
  const nav = useNavigate();
  const [getError, setError] = createSignal<string | null>(null);

  function validate(data: IUserSettings): boolean {
    const errors = Object.values(data).filter(el => el === undefined);
    if (errors.length === Object.values(data).length && data.phone?.length !== 13) return false;
    return true;
  };

  function showError(msg: string): void {
    setError(msg);
    setTimeout(() => setError(null), 2000);
  };

  async function update(formData: IUserSettings): Promise<void> {
    try {
      const isValid = validate(formData);
      if (!isValid) {
        showError("Uncorrect form");
        return;
      };
      const apiInstance = ProfileController.getInstance();
      const { data } = await apiInstance.updateSettings(formData);
      setProfile(data.data);
      nav('/profile')
    } catch (err) {
      const { response } = err as AxiosError;
      if (response.data.statusCode === 400) {
        showError(response.data.message);
      }
    }
  };

  return {
    getError, update
  }
};
