'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  Stack,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { useUserStore } from '@/stores/userStore';

/**
 * UserProfile - A user profile component using Zustand
 *
 * This component demonstrates how to use the user store for
 * authentication state and profile management.
 */
export default function UserProfile() {
  const { user, isAuthenticated, isLoading, login, logout, updateProfile } =
    useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleLogin = async () => {
    try {
      await login('demo@example.com');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleEdit = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
    });
  };

  const handleInputChange =
    (field: 'name' | 'email') =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditForm((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  if (!isAuthenticated) {
    return (
      <Card sx={{ maxWidth: 400, mx: 'auto' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Profile
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            Please log in to view your profile
          </Alert>
          <Button
            variant="contained"
            onClick={handleLogin}
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 500, mx: 'auto' }}>
      <CardContent>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={user?.avatar} sx={{ width: 64, height: 64 }}>
              {user?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>

          <Divider />

          {isEditing ? (
            <Stack spacing={2}>
              <TextField
                label="Name"
                value={editForm.name}
                onChange={handleInputChange('name')}
                fullWidth
              />
              <TextField
                label="Email"
                value={editForm.email}
                onChange={handleInputChange('email')}
                fullWidth
                type="email"
              />
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">{user?.name}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{user?.email}</Typography>
              </Box>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={handleEdit}
                >
                  Edit Profile
                </Button>
                <Button variant="outlined" color="error" onClick={logout}>
                  Logout
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
