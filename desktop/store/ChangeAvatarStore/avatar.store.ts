import { createStore } from "solid-js/store";

interface IAvatar {
  isOpen: boolean
}
const [avatarIsOpen, setAvatarIsOpen] = createStore<IAvatar>({ isOpen: true });
export const useAvatarStore = () => [avatarIsOpen, setAvatarIsOpen];
