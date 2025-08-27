import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { NAVIGATION_ITEMS, ACTION_ITEMS } from '@/constants/navigation';

interface NavbarDrawerProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export function NavbarDrawer({ open, onClose, onNavigate }: NavbarDrawerProps) {
  const theme = useTheme();

  const handleItemClick = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better mobile performance
      }}
      PaperProps={{
        sx: {
          width: 280,
          backgroundColor: 'background.paper',
          borderLeft: `1px solid ${theme.palette.divider}`,
        },
      }}
      aria-label='Mobile navigation menu'
      id='navigation-drawer'
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant='h6' component='h2' color='primary.main'>
          Menu
        </Typography>
        <IconButton
          onClick={onClose}
          aria-label='Close navigation menu'
          size='small'
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{ pt: 1 }}>
        {NAVIGATION_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                sx={{
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                aria-label={`Navigate to ${item.label} page`}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon color='primary' />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 1 }} />

      {/* Action Items */}
      <List>
        {ACTION_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                sx={{
                  py: 1.5,
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                aria-label={`Navigate to ${item.label} page`}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Icon color='action' />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
