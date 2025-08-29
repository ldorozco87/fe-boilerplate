import { Theme } from '@mui/material/styles';
import { alpha } from '@mui/material';

/**
 * Centralized style utilities for consistent design system
 *
 * This file provides:
 * - Consistent spacing and sizing
 * - Reusable style patterns
 * - Theme-aware utilities
 * - Responsive design helpers
 */

// Spacing utilities
export const spacing = {
  xs: 0.5,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 6,
} as const;

// Border radius utilities
export const borderRadius = {
  xxs: 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  round: '50%',
} as const;

// Shadow utilities
export const shadows = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

/**
 * Create consistent card styles
 */
export const createCardStyles = (theme: Theme) => ({
  card: {
    borderRadius: borderRadius.xxs,
    boxShadow: shadows.sm,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: shadows.md,
      transform: 'translateY(-2px)',
    },
  },
  cardContent: {
    p: spacing.xl,
  },
  cardHeader: {
    p: spacing.lg,
    pb: spacing.sm,
  },
  cardActions: {
    p: spacing.lg,
    pt: spacing.sm,
  },
});

/**
 * Create consistent button styles
 */
export const createButtonStyles = (theme: Theme) => ({
  primary: {
    borderRadius: borderRadius.xs, // 4px (la mitad de 8px)
    textTransform: 'none' as const,
    fontWeight: 600,
    px: spacing.lg,
    py: spacing.sm,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    },
  },
  secondary: {
    borderRadius: borderRadius.xs, // 4px (la mitad de 8px)
    textTransform: 'none' as const,
    fontWeight: 500,
    px: spacing.lg,
    py: spacing.sm,
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
      transform: 'translateY(-1px)',
    },
  },
  icon: {
    borderRadius: borderRadius.xs, // 4px (la mitad de 8px)
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.action.hover, 0.1),
      transform: 'scale(1.05)',
    },
  },
});

/**
 * Create consistent form styles
 */
export const createFormStyles = (theme: Theme) => ({
  field: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2, // 2px (más sutil que 4px)
      transition: 'all 0.3s ease',
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
        },
      },
    },
  },
  label: {
    fontWeight: 600,
    mb: spacing.sm,
  },
  helperText: {
    mt: spacing.xs,
    fontSize: '0.875rem',
  },
});

/**
 * Create consistent layout styles
 */
export const createLayoutStyles = () => ({
  section: {
    py: { xs: spacing.xl, md: spacing.xxl },
    px: { xs: spacing.lg, md: 0 },
  },
  container: {
    maxWidth: 'lg',
    mx: 'auto',
    px: { xs: spacing.lg, md: spacing.xl },
  },
  grid: {
    spacing: { xs: spacing.lg, md: spacing.xl },
  },
  stack: {
    spacing: { xs: spacing.lg, md: spacing.xl },
  },
});

/**
 * Create consistent animation styles
 */
export const createAnimationStyles = () => ({
  fadeIn: {
    opacity: 0,
    transform: 'translateY(20px)',
    animation: 'fadeInUp 0.6s ease forwards',
  },
  slideIn: {
    opacity: 0,
    transform: 'translateX(-20px)',
    animation: 'slideInLeft 0.6s ease forwards',
  },
  scaleIn: {
    opacity: 0,
    transform: 'scale(0.9)',
    animation: 'scaleIn 0.4s ease forwards',
  },
  stagger: (delay: number) => ({
    animationDelay: `${delay * 0.1}s`,
  }),
});

/**
 * Responsive breakpoint utilities
 */
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
} as const;

/**
 * Create responsive styles helper
 */
export const createResponsiveStyles = <T extends Record<string, unknown>>(
  styles: T
): T => {
  return styles;
};

/**
 * Common gradient utilities
 */
export const gradients = {
  primary: (theme: Theme) =>
    `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  secondary: (theme: Theme) =>
    `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
  subtle: (theme: Theme) =>
    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
  overlay: (theme: Theme) =>
    `linear-gradient(135deg, ${alpha(theme.palette.common.black, 0.1)} 0%, ${alpha(theme.palette.common.black, 0.3)} 100%)`,
};

/**
 * Z-index utilities
 */
export const zIndex = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const;
