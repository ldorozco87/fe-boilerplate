'use client';

import React from 'react';
import { Box } from '@mui/material';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <Box
        component='main'
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: { xs: 7, md: 8 }, // Compensar el navbar fixed
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
