import { createStore } from "solid-js/store";

const [value, setValue] = createStore<{value: string}>({value: ''});

export const setSearch = (value: string) => setValue('value', value);

export const getSearch = () => value.value;