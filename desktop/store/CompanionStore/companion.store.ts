import { createStore } from "solid-js/store";
import { ICompanion } from "../../types/index.types";

const [companion, setStoreCompanion] = createStore<{ companion: ICompanion | null }>({ companion: null });

export const getCompanion = (): ICompanion | null => companion.companion;

export const setCompanion = (user: null | ICompanion): void => setStoreCompanion('companion', user);
