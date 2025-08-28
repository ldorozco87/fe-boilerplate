'use client';

import React, { useState, useEffect } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Code as CodeIcon,
  ExpandMore as ExpandMoreIcon,
  Speed as SpeedIcon,
  Visibility as VisibilityIcon,
  BugReport as BugReportIcon,
} from '@mui/icons-material';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function DevTools() {
  const [open, setOpen] = useState(false);
  const [performanceData, setPerformanceData] = useState<Record<
    string,
    number
  > | null>(null);
  const { mode } = useTheme();

  // Only show in development
  const isDevelopment = process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navigation) {
        setPerformanceData({
          dns: Math.round(
            navigation.domainLookupEnd - navigation.domainLookupStart
          ),
          tcp: Math.round(navigation.connectEnd - navigation.connectStart),
          response: Math.round(
            navigation.responseEnd - navigation.requestStart
          ),
          dom: Math.round(
            navigation.domContentLoadedEventEnd - navigation.responseEnd
          ),
          load: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
          total: Math.round(navigation.loadEventEnd - navigation.fetchStart),
        });
      }
    }
  }, [open]);

  if (!isDevelopment) {
    return null;
  }

  const devInfo = {
    'Next.js Version': '15.5.2',
    'React Version': '19.1.0',
    'Material UI Version': '7.3.1',
    'Theme Mode': mode,
    Environment: process.env.NODE_ENV,
    'Build Tool': 'Turbopack',
    TypeScript: 'Enabled',
  };

  const projectStructure = [
    { path: 'src/app/', description: 'App Router pages and layouts' },
    { path: 'src/components/', description: 'Reusable React components' },
    { path: 'src/hooks/', description: 'Custom React hooks' },
    { path: 'src/lib/', description: 'Utility functions and configurations' },
    { path: 'src/types/', description: 'TypeScript type definitions' },
    { path: 'src/data/', description: 'Static data and mock APIs' },
    {
      path: 'src/styles/',
      description: 'Global styles and theme configuration',
    },
  ];

  const features = [
    { name: 'Dark/Light Mode', status: 'Implemented' },
    { name: 'Internationalization', status: 'Implemented' },
    { name: 'Shopping Cart', status: 'Implemented' },
    { name: 'Form Validation', status: 'Implemented' },
    { name: 'Scroll Spy Navigation', status: 'Implemented' },
    { name: 'SEO Optimization', status: 'Implemented' },
    { name: 'Performance Monitoring', status: 'Implemented' },
    { name: 'Analytics Ready', status: 'Implemented' },
  ];

  return (
    <>
      <Fab
        size="small"
        sx={{
          position: 'fixed',
          bottom: 90,
          right: 24,
          backgroundColor: 'error.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'error.dark',
          },
        }}
        onClick={() => setOpen(true)}
      >
        <CodeIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={2}>
            <BugReportIcon color="error" />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Developer Tools
            </Typography>
            <Chip
              label="DEV MODE"
              color="error"
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={3}>
            <Alert severity="info">
              This panel is only visible in development mode and provides useful
              information about the boilerplate structure and performance.
            </Alert>

            {/* Environment Info */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <VisibilityIcon />
                  <Typography variant="h6">Environment & Tech Stack</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableBody>
                      {Object.entries(devInfo).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell sx={{ fontWeight: 600 }}>{key}</TableCell>
                          <TableCell>{value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            {/* Performance */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <SpeedIcon />
                  <Typography variant="h6">Performance Metrics</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                {performanceData ? (
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600 }}>Metric</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Time (ms)
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>DNS Lookup</TableCell>
                          <TableCell>{performanceData.dns}</TableCell>
                          <TableCell>
                            <Chip
                              label={
                                performanceData.dns < 100 ? 'Good' : 'Slow'
                              }
                              color={
                                performanceData.dns < 100
                                  ? 'success'
                                  : 'warning'
                              }
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Server Response</TableCell>
                          <TableCell>{performanceData.response}</TableCell>
                          <TableCell>
                            <Chip
                              label={
                                performanceData.response < 500 ? 'Good' : 'Slow'
                              }
                              color={
                                performanceData.response < 500
                                  ? 'success'
                                  : 'warning'
                              }
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>DOM Processing</TableCell>
                          <TableCell>{performanceData.dom}</TableCell>
                          <TableCell>
                            <Chip
                              label={
                                performanceData.dom < 1000 ? 'Good' : 'Slow'
                              }
                              color={
                                performanceData.dom < 1000
                                  ? 'success'
                                  : 'warning'
                              }
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Total Load Time</TableCell>
                          <TableCell>{performanceData.total}</TableCell>
                          <TableCell>
                            <Chip
                              label={
                                performanceData.total < 3000 ? 'Good' : 'Slow'
                              }
                              color={
                                performanceData.total < 3000
                                  ? 'success'
                                  : 'warning'
                              }
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography color="text.secondary">
                    Performance data not available
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Project Structure */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <CodeIcon />
                  <Typography variant="h6">Project Structure</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {projectStructure.map((item) => (
                    <Box key={item.path}>
                      <Typography
                        variant="body2"
                        sx={{ fontFamily: 'monospace', fontWeight: 600 }}
                      >
                        {item.path}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 2 }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>

            {/* Features Checklist */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Features Implemented</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={1}>
                  {features.map((feature) => (
                    <Stack
                      key={feature.name}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="body2">{feature.name}</Typography>
                      <Chip
                        label={feature.status}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Stack>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
