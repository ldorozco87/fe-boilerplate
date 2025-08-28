'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Chip,
  Stack,
  Tabs,
  Tab,
  TextField,
  InputAdornment,

  Fab,
  Badge,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Add as AddIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import CartProvider from '@/components/providers/CartProvider';
import { useCart } from '@/hooks/useCart';
import { trackAddToCart } from '@/components/analytics/Analytics';
import { categories, getProductsByCategory } from '@/data/products';
import { Product } from '@/types/ecommerce';
import ShoppingCartDrawer from '@/components/ecommerce/ShoppingCartDrawer';

const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

function EcommerceContent() {
  const theme = useTheme();

  const { addToCart, getTotalItems } = useCart();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  
  const filteredProducts = getProductsByCategory(selectedCategory).filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    
    // Track analytics event
    trackAddToCart({
      item_id: product.id,
      item_name: product.name,
      item_category: product.category,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <Box sx={{ pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              E-commerce Demo
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Experience a fully functional e-commerce interface with cart management, 
              product filtering, and checkout simulation.
            </Typography>
          </MotionBox>

          {/* Search and Filters */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Stack spacing={3}>
              {/* Search */}
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  maxWidth: 500,
                  mx: 'auto',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  },
                }}
              />

              {/* Categories */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  overflow: 'auto',
                }}
              >
                <Tabs
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 500,
                      minWidth: 'auto',
                      px: 3,
                    },
                  }}
                >
                  {categories.map((category) => (
                    <Tab
                      key={category}
                      label={category}
                      value={category}
                    />
                  ))}
                </Tabs>
              </Box>
            </Stack>
          </MotionBox>

          {/* Products Grid */}
          <Grid container spacing={4}>
            {filteredProducts.map((product, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: theme.shadows[12],
                    },
                  }}
                >
                  {/* Product Image */}
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 240,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ opacity: 0.5 }}
                      >
                        {product.name}
                      </Typography>
                    </CardMedia>
                    
                    {/* Stock Status */}
                    <Chip
                      label={product.inStock ? 'In Stock' : 'Out of Stock'}
                      size="small"
                      color={product.inStock ? 'success' : 'error'}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                      }}
                    />
                    
                    {/* Featured Badge */}
                    {product.featured && (
                      <Chip
                        label="Featured"
                        size="small"
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Stack spacing={2}>
                      {/* Product Info */}
                      <Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          gutterBottom
                          sx={{
                            fontWeight: 600,
                            fontSize: '1rem',
                            lineHeight: 1.3,
                            height: '2.6em',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {product.name}
                        </Typography>
                        
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            height: '3em',
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            mb: 2,
                          }}
                        >
                          {product.description}
                        </Typography>
                      </Box>

                      {/* Rating */}
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          size="small"
                          readOnly
                        />
                        <Typography variant="body2" color="text.secondary">
                          ({product.reviews})
                        </Typography>
                      </Stack>

                      {/* Price and Actions */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 'auto' }}
                      >
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: 700 }}
                        >
                          ${product.price}
                        </Typography>
                        
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<AddIcon />}
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Stack>
                    </Stack>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              textAlign="center"
              sx={{ py: 8 }}
            >
              <Typography variant="h6" color="text.secondary">
                No products found matching your criteria.
              </Typography>
            </MotionBox>
          )}
        </Stack>
      </Container>

      {/* Floating Cart Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
        onClick={() => setCartOpen(true)}
      >
        <Badge badgeContent={getTotalItems()} color="error">
          <ShoppingCartIcon />
        </Badge>
      </Fab>

      {/* Shopping Cart Drawer */}
      <ShoppingCartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </Box>
  );
}

export default function EcommercePage() {
  return (
    <CartProvider>
      <EcommerceContent />
    </CartProvider>
  );
}
