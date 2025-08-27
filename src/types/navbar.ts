import { SvgIconProps } from '@mui/material';

export interface NavigationItem {
  label: string;
  path: string;
  icon: React.ComponentType<SvgIconProps>;
}

export interface NavbarProps {
  // Add any future props here
}

export interface NavbarMenuProps {
  onNavigate: (path: string) => void;
}

export interface NavbarDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}
