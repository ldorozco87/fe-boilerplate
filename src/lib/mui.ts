/**
 * MUI Barrel Export - Centralized Material-UI imports
 *
 * This file centralizes all MUI imports to:
 * - Reduce bundle size through tree shaking
 * - Provide consistent imports across components
 * - Make it easier to replace MUI components if needed
 */

// Layout Components
export {
  Box,
  Container,
  Grid,
  Stack,
  Paper,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
} from '@mui/material';

// Typography
export { Typography, Link } from '@mui/material';

// Input Components
export {
  TextField,
  Button,
  IconButton,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Switch,
  Slider,
  Rating,
} from '@mui/material';

// Navigation
export {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  Breadcrumbs,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Tabs,
  Tab,
} from '@mui/material';

// Feedback
export {
  Alert,
  AlertTitle,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Backdrop,
  CircularProgress,
  LinearProgress,
  Skeleton,
  Tooltip,
  Popover,
} from '@mui/material';

// Data Display
export {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Avatar,
  AvatarGroup,
  Badge,
  Chip,
} from '@mui/material';

// Layout Utilities
export {
  useMediaQuery,
  useTheme,
  alpha,
  styled,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';

// Icons - Import specific icons as needed
// export * from '@mui/icons-material';

// Lab Components (if needed) - Commented out as @mui/lab is not installed
// export {
//   DatePicker,
//   TimePicker,
//   DateTimePicker,
//   LoadingButton,
//   TabList,
//   TabPanel,
//   TabContext,
// } from '@mui/lab';
