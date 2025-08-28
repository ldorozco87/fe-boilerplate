# Zustand State Management Guide

This guide explains how to use Zustand for state management in the Next.js boilerplate.

## What is Zustand?

Zustand is a small, fast, and scalable state management solution for React applications. It provides a simple API for managing global state without the complexity of Redux or the boilerplate of Context API.

## Key Features

- **Lightweight**: Only ~2.5kb gzipped
- **TypeScript Support**: Full TypeScript support out of the box
- **No Providers**: Works without wrapping your app in providers
- **Persistence**: Built-in support for localStorage persistence
- **DevTools**: Redux DevTools integration
- **Middleware**: Extensible with middleware

## Store Structure

The boilerplate includes several example stores in `src/stores/`:

```
src/stores/
├── index.ts          # Central export file
├── cartStore.ts      # Shopping cart management
├── userStore.ts      # User authentication & profile
├── themeStore.ts     # Theme preferences
└── appStore.ts       # Global app state
```

## Basic Usage

### Creating a Store

```typescript
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

### Using a Store in Components

```typescript
import { useCounterStore } from '@/stores/counterStore';

export default function Counter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Available Stores

### Cart Store (`useCartStore`)

Manages shopping cart state with localStorage persistence.

```typescript
const {
  items, // Cart items array
  addToCart, // Add product to cart
  removeFromCart, // Remove product from cart
  updateQuantity, // Update product quantity
  clearCart, // Clear all items
  getTotalItems, // Get total item count
  getTotalPrice, // Get total price
} = useCartStore();
```

### User Store (`useUserStore`)

Manages user authentication and profile data.

```typescript
const {
  user, // Current user object
  isAuthenticated, // Authentication status
  isLoading, // Loading state
  login, // Login function
  logout, // Logout function
  updateProfile, // Update user profile
} = useUserStore();
```

### Theme Store (`useThemeStore`)

Manages theme preferences with system detection.

```typescript
const {
  mode, // 'light' | 'dark' | 'system'
  setMode, // Set theme mode
  toggleMode, // Toggle between modes
  isDark, // Current dark mode status
} = useThemeStore();
```

### App Store (`useAppStore`)

Manages global application state and UI interactions.

```typescript
const {
  sidebarOpen, // Sidebar visibility
  notifications, // Notification array
  isPageLoading, // Page loading state
  toggleSidebar, // Toggle sidebar
  addNotification, // Add notification
  removeNotification, // Remove notification
  setPageLoading, // Set loading state
} = useAppStore();
```

## Middleware

### Persistence

Use the `persist` middleware to save state to localStorage:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      // your state and actions
    }),
    {
      name: 'storage-key', // localStorage key
      partialize: (state) => ({
        // only persist specific parts of state
        user: state.user,
      }),
    }
  )
);
```

### DevTools

Use the `devtools` middleware for Redux DevTools integration:

```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools(
    (set) => ({
      // your state and actions
    }),
    {
      name: 'store-name', // DevTools name
    }
  )
);
```

## Best Practices

### 1. Store Organization

- Keep stores focused on specific domains
- Use descriptive names for stores and actions
- Export stores from a central index file

### 2. TypeScript

- Always define interfaces for your store state
- Use proper typing for actions and selectors
- Leverage TypeScript's type inference

### 3. Performance

- Use selectors to prevent unnecessary re-renders
- Split large stores into smaller, focused stores
- Use `shallow` comparison for complex objects

```typescript
import { shallow } from 'zustand/shallow';

// Only re-render when specific fields change
const { name, email } = useUserStore(
  (state) => ({ name: state.user?.name, email: state.user?.email }),
  shallow
);
```

### 4. Testing

- Test stores in isolation
- Mock external dependencies
- Use the store's actions in your tests

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounterStore } from '@/stores/counterStore';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounterStore());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## Migration from Context API

If you're migrating from React Context API:

1. **Replace Context with Store**: Convert your context state to a Zustand store
2. **Update Components**: Replace `useContext` with the appropriate store hook
3. **Remove Providers**: Zustand doesn't require providers
4. **Update Tests**: Modify tests to work with the new store structure

### Example Migration

**Before (Context API):**

```typescript
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
```

**After (Zustand):**

```typescript
export const useCartStore = create((set) => ({
  // state and actions
}));
```

## Examples

Check out the example components in `src/components/examples/`:

- `ZustandExamples.tsx` - Comprehensive demo of all stores
- `ThemeToggle.tsx` - Theme switching component
- `UserProfile.tsx` - User profile management

Visit `/zustand-demo` to see these examples in action.

## Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Zustand TypeScript Guide](https://github.com/pmndrs/zustand#typescript)
- [Zustand Best Practices](https://github.com/pmndrs/zustand#best-practices)
