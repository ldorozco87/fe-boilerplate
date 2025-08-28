'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Stack,
  Alert,
} from '@mui/material';
import { useCartStore } from '@/stores/cartStore';
import { useUserStore } from '@/stores/userStore';
import { useThemeStore } from '@/stores/themeStore';
import { useAppStore } from '@/stores/appStore';
import { products } from '@/data/products';

/**
 * ZustandExamples - Component demonstrating Zustand usage
 *
 * This component shows how to use different Zustand stores:
 * - Cart Store: Managing shopping cart state
 * - User Store: Managing user authentication and profile
 * - Theme Store: Managing theme preferences
 * - App Store: Managing global app state
 */
export default function ZustandExamples() {
  // Cart Store
  const {
    items: cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  // User Store
  const {
    user,
    isAuthenticated,
    isLoading: userLoading,
    login,
    logout,
    updateProfile,
  } = useUserStore();

  // Theme Store
  const { mode, setMode, toggleMode, isDark } = useThemeStore();

  // App Store
  const {
    sidebarOpen,
    notifications,
    toggleSidebar,
    addNotification,
    removeNotification,
    clearNotifications,
  } = useAppStore();

  const handleLogin = async () => {
    try {
      await login('user@example.com');
      addNotification({
        type: 'success',
        title: 'Login Successful',
        message: 'Welcome back!',
      });
    } catch {
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: 'Please check your credentials',
      });
    }
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product);
      addNotification({
        type: 'success',
        title: 'Added to Cart',
        message: `${product.name} has been added to your cart`,
      });
    }
  };

  const handleUpdateProfile = () => {
    updateProfile({ name: 'Updated Name' });
    addNotification({
      type: 'info',
      title: 'Profile Updated',
      message: 'Your profile has been updated',
    });
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Zustand Store Examples
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        This component demonstrates how to use different Zustand stores for
        state management.
      </Typography>

      <Stack spacing={4}>
        {/* Cart Store Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🛒 Cart Store
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Managing shopping cart state with persistence
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                onClick={() => handleAddToCart('1')}
                disabled={userLoading}
              >
                Add Product 1
              </Button>
              <Button
                variant="contained"
                onClick={() => handleAddToCart('2')}
                disabled={userLoading}
              >
                Add Product 2
              </Button>
              <Button
                variant="outlined"
                onClick={clearCart}
                disabled={cartItems.length === 0}
              >
                Clear Cart
              </Button>
            </Stack>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">
                Cart Items: {getTotalItems()} | Total: $
                {getTotalPrice().toFixed(2)}
              </Typography>
            </Box>

            {cartItems.length > 0 && (
              <Stack spacing={1}>
                {cartItems.map((item) => (
                  <Box
                    key={item.product.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2">
                      {item.product.name} x {item.quantity}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* User Store Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              👤 User Store
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Managing user authentication and profile data
            </Typography>

            {isAuthenticated ? (
              <Stack spacing={2}>
                <Alert severity="success">
                  Welcome, {user?.name}! ({user?.email})
                </Alert>
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" onClick={handleUpdateProfile}>
                    Update Profile
                  </Button>
                  <Button variant="outlined" color="error" onClick={logout}>
                    Logout
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Alert severity="info">
                  Not logged in. Click the button below to simulate login.
                </Alert>
                <Button
                  variant="contained"
                  onClick={handleLogin}
                  disabled={userLoading}
                >
                  {userLoading ? 'Logging in...' : 'Login'}
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>

        {/* Theme Store Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🎨 Theme Store
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Managing theme preferences with system detection
            </Typography>

            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Current Theme: {mode} {isDark ? '(Dark)' : '(Light)'}
                </Typography>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  variant={mode === 'light' ? 'contained' : 'outlined'}
                  onClick={() => setMode('light')}
                >
                  Light
                </Button>
                <Button
                  variant={mode === 'dark' ? 'contained' : 'outlined'}
                  onClick={() => setMode('dark')}
                >
                  Dark
                </Button>
                <Button
                  variant={mode === 'system' ? 'contained' : 'outlined'}
                  onClick={() => setMode('system')}
                >
                  System
                </Button>
                <Button variant="outlined" onClick={toggleMode}>
                  Toggle
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* App Store Example */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📱 App Store
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Managing global app state and UI interactions
            </Typography>

            <Stack spacing={2}>
              <Box>
                <FormControlLabel
                  control={
                    <Switch checked={sidebarOpen} onChange={toggleSidebar} />
                  }
                  label={`Sidebar: ${sidebarOpen ? 'Open' : 'Closed'}`}
                />
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() =>
                    addNotification({
                      type: 'info',
                      title: 'Test Notification',
                      message: 'This is a test notification',
                    })
                  }
                >
                  Add Notification
                </Button>
                <Button
                  variant="outlined"
                  onClick={() =>
                    addNotification({
                      type: 'success',
                      title: 'Success!',
                      message: 'Operation completed successfully',
                    })
                  }
                >
                  Success Notification
                </Button>
                <Button
                  variant="outlined"
                  onClick={clearNotifications}
                  disabled={notifications.length === 0}
                >
                  Clear All
                </Button>
              </Stack>

              {notifications.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Notifications ({notifications.length}):
                  </Typography>
                  <Stack spacing={1}>
                    {notifications.map((notification) => (
                      <Alert
                        key={notification.id}
                        severity={notification.type}
                        onClose={() => removeNotification(notification.id)}
                      >
                        <Typography variant="subtitle2">
                          {notification.title}
                        </Typography>
                        {notification.message && (
                          <Typography variant="body2">
                            {notification.message}
                          </Typography>
                        )}
                      </Alert>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
