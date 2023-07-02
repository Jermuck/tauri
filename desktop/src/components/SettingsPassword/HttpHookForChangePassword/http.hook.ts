import { useNavigate } from "@solidjs/router";
import { Accessor, createSignal } from "solid-js";
import { AxiosError } from "../../../../types/index.types";
import { ProfileController } from "../../../http/controllers/ProfileController/profile.controller";
import { IPassword } from "../SettingsPassword";

interface IChangePassword {
  getError: Accessor<string | null>;
  change: (object: IPassword) => Promise<void>;
}

export const useChangePassword = (): IChangePassword => {
  const [getError, setError] = createSignal<string | null>(null);
  const nav = useNavigate();

  const validate = (data: IPassword): boolean => {
    if (Object.values(data).length < 3) return false;
    return data?.newPassword === data?.repeatPassword
  }

  function showError(value: string): void {
    setError(value);
    setTimeout(() => setError(null), 2000);
  };

  async function change(object: IPassword): Promise<void> {
    try {
      if (!validate(object)) {
        showError("Uncorrect form");
        return;
      };
      const instance = ProfileController.getInstance();
      //@ts-ignore
      await instance.change({ ...object });
      nav('/profile');
    } catch (err: any) {
      const { response } = err as AxiosError;
      if (response.data.statusCode === 400) {
        showError(response.data.message);
      }
    }
  };

  return { getError, change };
};
