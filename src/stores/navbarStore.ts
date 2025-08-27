import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface NavbarState {
  isDrawerOpen: boolean;
  activePath: string;
}

interface NavbarActions {
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setActivePath: (path: string) => void;
}

type NavbarStore = NavbarState & NavbarActions;

const initialState: NavbarState = {
  isDrawerOpen: false,
  activePath: '/',
};

export const useNavbarStore = create<NavbarStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      openDrawer: () => {
        set({ isDrawerOpen: true });
      },

      closeDrawer: () => {
        set({ isDrawerOpen: false });
      },

      toggleDrawer: () => {
        const { isDrawerOpen } = get();
        set({ isDrawerOpen: !isDrawerOpen });
      },

      setActivePath: (path: string) => {
        set({ activePath: path });
      },
    }),
    {
      name: 'navbar-store',
    }
  )
);
