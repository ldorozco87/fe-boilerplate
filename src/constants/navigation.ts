import {
  Home as HomeIcon,
  Info as InfoIcon,
  ContactSupport as ContactIcon,
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
} from '@mui/icons-material';
import { NavigationItem } from '@/types/navbar';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Home',
    path: '/',
    icon: HomeIcon,
  },
  {
    label: 'About',
    path: '/about',
    icon: InfoIcon,
  },
  {
    label: 'Contact',
    path: '/contact',
    icon: ContactIcon,
  },
] as const;

export const ACTION_ITEMS: NavigationItem[] = [
  {
    label: 'Login',
    path: '/login',
    icon: LoginIcon,
  },
  {
    label: 'Sign Up',
    path: '/signup',
    icon: SignUpIcon,
  },
] as const;

export const PATHS = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const;

export type NavigationPath = (typeof PATHS)[keyof typeof PATHS];
