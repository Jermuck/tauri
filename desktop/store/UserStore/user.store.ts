import { createStore } from "solid-js/store";
import { IUser } from "../../types/index.types";

const [userFromStore, setUserStore] = createStore<IUser>({} as IUser);
export const useUserFromStore = () => [userFromStore, setUserStore];
