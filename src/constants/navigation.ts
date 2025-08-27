import {
  Home as HomeIcon,
  Star as FeaturesIcon,
  Info as AboutIcon,
  RocketLaunch as GetStartedIcon,
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
    label: 'Features',
    path: '/features',
    icon: FeaturesIcon,
  },
  {
    label: 'About',
    path: '/about',
    icon: AboutIcon,
  },
  {
    label: 'Get Started',
    path: '/get-started',
    icon: GetStartedIcon,
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
  FEATURES: '/features',
  ABOUT: '/about',
  GET_STARTED: '/get-started',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const;

export type NavigationPath = (typeof PATHS)[keyof typeof PATHS];
