import { createStore } from "solid-js/store";

interface IAvatar {
  isOpen: boolean
}
const [avatarIsOpen, setAvatarIsOpen] = createStore<IAvatar>({ isOpen: false });

export const getAvatar = (): IAvatar => avatarIsOpen;

export const setAvatar = (flag: boolean) => setAvatarIsOpen('isOpen', flag);
