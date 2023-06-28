import { IUser } from "../../types/index.types";
import { createStore } from "solid-js/store";

const [userFromStore, setUserStore] = createStore<{ user: IUser | null }>({ user: null });

export const setUser = (user: IUser | null): void => setUserStore('user', user);

export const getUser = (): IUser | null => userFromStore.user;
