import { createStore } from "solid-js/store";

const [loadingStore, setLoadingStore] = createStore<{ isLoading: boolean }>({ isLoading: false });

export const setLoading = (value: boolean): void => { setLoadingStore('isLoading', value) };
export const getLoading = (): boolean => loadingStore.isLoading;


