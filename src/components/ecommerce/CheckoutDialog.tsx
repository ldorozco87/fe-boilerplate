'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  TextField,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Alert,
  CircularProgress,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  CreditCard as CreditCardIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCart } from '@/hooks/useCart';
import { CheckoutFormData } from '@/types/ecommerce';

const MotionBox = motion.create(Box);

const checkoutSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  cardNumber: z.string().min(16, 'Card number must be 16 digits'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Format: MM/YY'),
  cvc: z.string().min(3, 'CVC must be 3-4 digits'),
  nameOnCard: z.string().min(1, 'Name on card is required'),
});

interface CheckoutDialogProps {
  open: boolean;
  onClose: () => void;
  total: number;
  itemCount: number;
}

const steps = ['Shipping Information', 'Payment Details', 'Confirmation'];

export default function CheckoutDialog({
  open,
  onClose,
  total,
  itemCount,
}: CheckoutDialogProps) {
  const theme = useTheme();
  const { clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      nameOnCard: '',
    },
  });

  const watchedFields = watch();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleClose = () => {
    setActiveStep(0);
    setOrderComplete(false);
    setIsProcessing(false);
    reset();
    onClose();
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      console.log('Order placed:', {
        orderData: data,
        total,
        itemCount,
        timestamp: new Date().toISOString(),
      });

      setOrderComplete(true);
      clearCart();
      setActiveStep(2);
    } catch (error) {
      console.error('Order processing error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!(
          watchedFields.email &&
          watchedFields.firstName &&
          watchedFields.lastName &&
          watchedFields.address &&
          watchedFields.city &&
          watchedFields.postalCode &&
          watchedFields.country
        );
      case 1:
        return !!(
          watchedFields.cardNumber &&
          watchedFields.expiryDate &&
          watchedFields.cvc &&
          watchedFields.nameOnCard
        );
      default:
        return true;
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="First Name"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Last Name"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Address"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="City"
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Postal Code"
                      error={!!errors.postalCode}
                      helperText={errors.postalCode?.message}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Country"
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={3}>
            <Typography variant="h6" gutterBottom>
              Payment Details
            </Typography>

            <Controller
              name="nameOnCard"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Name on Card"
                  error={!!errors.nameOnCard}
                  helperText={errors.nameOnCard?.message}
                />
              )}
            />

            <Controller
              name="cardNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                  inputProps={{ maxLength: 19 }}
                  onChange={(e) => {
                    // Format card number with spaces
                    const value = e.target.value
                      .replace(/\s/g, '')
                      .replace(/(.{4})/g, '$1 ')
                      .trim();
                    field.onChange(value);
                  }}
                />
              )}
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="expiryDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Expiry Date"
                      placeholder="MM/YY"
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate?.message}
                      inputProps={{ maxLength: 5 }}
                      onChange={(e) => {
                        // Format expiry date
                        const value = e.target.value
                          .replace(/\D/g, '')
                          .replace(/(.{2})/, '$1/');
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="cvc"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="CVC"
                      placeholder="123"
                      error={!!errors.cvc}
                      helperText={errors.cvc?.message}
                      inputProps={{ maxLength: 4 }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Alert severity="info" sx={{ mt: 2 }}>
              This is a demo checkout. No real payment will be processed.
            </Alert>
          </Stack>
        );

      case 2:
        return (
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            {orderComplete ? (
              <Stack spacing={3} alignItems="center">
                <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main' }} />
                <Typography variant="h5" color="success.main" gutterBottom>
                  Order Placed Successfully!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Thank you for your order. You will receive a confirmation
                  email shortly.
                </Typography>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Order Details (logged to console):
                  </Typography>
                  <Typography variant="h6">
                    {itemCount} items - ${total.toFixed(2)}
                  </Typography>
                </Paper>
              </Stack>
            ) : (
              <Stack spacing={3} alignItems="center">
                <CircularProgress size={60} />
                <Typography variant="h6">Processing your order...</Typography>
                <Typography variant="body2" color="text.secondary">
                  Please don&apos;t close this window
                </Typography>
              </Stack>
            )}
          </MotionBox>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={orderComplete ? handleClose : undefined}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: '70vh',
        },
      }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Checkout
          </Typography>
          {!isProcessing && (
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={4}>
          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  icon={
                    index === 0 ? (
                      <ShippingIcon />
                    ) : index === 1 ? (
                      <CreditCardIcon />
                    ) : (
                      <CheckCircleIcon />
                    )
                  }
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Order Summary */}
          {activeStep < 2 && (
            <Paper
              sx={{
                p: 3,
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                <Typography>
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${total.toFixed(2)}
                </Typography>
              </Stack>
            </Paper>
          )}

          {/* Step Content */}
          <Box sx={{ minHeight: 300 }}>{renderStepContent(activeStep)}</Box>
        </Stack>
      </DialogContent>

      {!orderComplete && activeStep < 2 && (
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={activeStep === 0 ? handleClose : handleBack}
            disabled={isProcessing}
          >
            {activeStep === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === 1 ? handleSubmit(onSubmit) : handleNext}
            disabled={!isStepValid(activeStep) || isProcessing}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {activeStep === 1 ? 'Place Order' : 'Next'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}
