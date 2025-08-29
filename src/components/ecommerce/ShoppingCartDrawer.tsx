'use client';

import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Stack,
  Button,
  Divider,
  Card,
  CardContent,
  TextField,
  useTheme,
  alpha,
  Avatar,
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingBag as ShoppingBagIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { trackRemoveFromCart } from '@/components/analytics/Analytics';
import CheckoutDialog from './CheckoutDialog';

const MotionBox = motion.create(Box);
const MotionListItem = motion.create(ListItem);

interface ShoppingCartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ShoppingCartDrawer({
  open,
  onClose,
}: ShoppingCartDrawerProps) {
  const theme = useTheme();
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const item = items.find((item) => item.product.id === productId);

    if (newQuantity < 1) {
      if (item) {
        trackRemoveFromCart({
          item_id: item.product.id,
          item_name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        });
      }
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        role="dialog"
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
        PaperProps={{
          sx: {
            width: { xs: '100vw', sm: 450 },
            background:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.95)
                : theme.palette.background.paper,
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              p: 3,
              borderBottom: 1,
              borderColor: 'divider',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <ShoppingBagIcon color="primary" />
              <Typography id="cart-title" variant="h6" sx={{ fontWeight: 600 }}>
                Shopping Cart ({getTotalItems()})
              </Typography>
            </Stack>
            <IconButton onClick={onClose} size="large">
              <CloseIcon />
            </IconButton>
          </Stack>

          {/* Cart Items */}
          <Box
            id="cart-description"
            sx={{ flexGrow: 1, overflow: 'auto' }}
            aria-label="Shopping cart items"
          >
            {items.length === 0 ? (
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  p: 4,
                  textAlign: 'center',
                }}
              >
                <ShoppingBagIcon
                  sx={{
                    fontSize: 80,
                    color: 'text.secondary',
                    opacity: 0.5,
                    mb: 2,
                  }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Your cart is empty
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add some products to get started!
                </Typography>
              </MotionBox>
            ) : (
              <List sx={{ p: 0 }}>
                <AnimatePresence>
                  {items.map((item, index) => (
                    <MotionListItem
                      key={item.product.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      sx={{
                        p: 0,
                        '&:not(:last-child)': {
                          borderBottom: 1,
                          borderColor: 'divider',
                        },
                      }}
                    >
                      <Card
                        sx={{
                          width: '100%',
                          boxShadow: 0,
                          border: 'none',
                          borderRadius: 0,
                          background: 'transparent',
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Stack spacing={2}>
                            {/* Product Info */}
                            <Stack direction="row" spacing={2}>
                              <Avatar
                                variant="rounded"
                                sx={{
                                  width: 60,
                                  height: 60,
                                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{ fontWeight: 600 }}
                                >
                                  IMG
                                </Typography>
                              </Avatar>

                              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    fontWeight: 600,
                                    lineHeight: 1.3,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                  }}
                                >
                                  {item.product.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mt: 0.5 }}
                                >
                                  ${item.product.price.toFixed(2)} each
                                </Typography>
                              </Box>

                              <IconButton
                                size="small"
                                onClick={() => removeFromCart(item.product.id)}
                                sx={{
                                  color: 'error.main',
                                  '&:hover': {
                                    backgroundColor: alpha(
                                      theme.palette.error.main,
                                      0.1
                                    ),
                                  },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Stack>

                            {/* Quantity Controls */}
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                              >
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.product.id,
                                      item.quantity - 1
                                    )
                                  }
                                  sx={{
                                    border: 1,
                                    borderColor: 'divider',
                                    '&:hover': {
                                      backgroundColor: 'action.hover',
                                    },
                                  }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>

                                <TextField
                                  size="small"
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value) || 1;
                                    handleQuantityChange(
                                      item.product.id,
                                      value
                                    );
                                  }}
                                  inputProps={{
                                    style: { textAlign: 'center', width: 40 },
                                    min: 1,
                                  }}
                                  sx={{
                                    '& .MuiOutlinedInput-root': {
                                      '& fieldset': {
                                        borderColor: 'divider',
                                      },
                                    },
                                  }}
                                />

                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleQuantityChange(
                                      item.product.id,
                                      item.quantity + 1
                                    )
                                  }
                                  sx={{
                                    border: 1,
                                    borderColor: 'divider',
                                    '&:hover': {
                                      backgroundColor: 'action.hover',
                                    },
                                  }}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Stack>

                              <Typography
                                variant="h6"
                                color="primary"
                                sx={{ fontWeight: 700 }}
                              >
                                $
                                {(item.product.price * item.quantity).toFixed(
                                  2
                                )}
                              </Typography>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </Card>
                    </MotionListItem>
                  ))}
                </AnimatePresence>
              </List>
            )}
          </Box>

          {/* Footer */}
          {items.length > 0 && (
            <Box
              sx={{
                p: 3,
                borderTop: 1,
                borderColor: 'divider',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
              }}
            >
              <Stack spacing={3}>
                <Divider />

                {/* Total */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Total:
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                  >
                    ${getTotalPrice().toFixed(2)}
                  </Typography>
                </Stack>

                {/* Checkout Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<CreditCardIcon />}
                  onClick={handleCheckout}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Checkout Dialog */}
      <CheckoutDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={getTotalPrice()}
        itemCount={getTotalItems()}
      />
    </>
  );
}
