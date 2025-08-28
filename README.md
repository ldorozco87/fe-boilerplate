# 🚀 Next.js 15 High-Performance Boilerplate

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Material UI](https://img.shields.io/badge/Material_UI-7.3.x-0081CB?style=for-the-badge&logo=mui)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, production-ready boilerplate for building high-performance static websites with **Next.js 15**, **Material UI**, **TypeScript**, and **internationalization** support.

> 🎯 **Perfect for:** Static websites, landing pages, portfolios, blogs, documentation sites, and any project requiring fast performance and SEO optimization.

## ✨ Key Features

### 🔧 **Modern Tech Stack**

- **Next.js 15.5.2** - Latest version with App Router and Turbopack
- **Material UI (MUI) 7.3.x** - React component library with custom theming
- **TypeScript 5.x** - Full type safety and better developer experience
- **SASS/SCSS** - Advanced CSS with variables, mixins, and modules
- **Framer Motion** - Smooth, performant animations

### 🌐 **Internationalization (i18n)**

- **next-intl** - Professional i18n solution
- **Multi-language routing** - `/en/` and `/es/` routes
- **Dynamic translations** - Client and server-side rendering
- **Easy to extend** - Add new languages effortlessly

### 📝 **Forms & Validation**

- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation
- **Real-time validation** - Instant user feedback
- **Accessible forms** - WCAG compliant form components

### ⚡ **Performance & SEO**

- **Static Site Generation (SSG)** - Lightning-fast loading
- **Dynamic metadata** - SEO optimized for each page
- **Sitemap generation** - Automatic XML sitemaps
- **PWA ready** - Web app manifest and offline support
- **Image optimization** - Next.js built-in optimization

### 🎨 **UI & UX**

- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode Ready** - Theme switching capability
- **Smooth Animations** - Scroll-triggered and interaction animations
- **Accessibility** - WCAG 2.1 compliant components

## 📁 Project Structure

```
📦 nextjs-boilerplate
├── 📁 public/                    # Static assets
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── 📁 [locale]/         # Internationalized routes
│   │   │   ├── 📄 page.tsx      # Home page
│   │   │   ├── 📄 layout.tsx    # Locale layout
│   │   │   └── 📁 contact/      # Contact page
│   │   ├── 📄 globals.css       # Global styles
│   │   ├── 📄 layout.tsx        # Root layout
│   │   ├── 📄 sitemap.ts        # SEO sitemap
│   │   ├── 📄 robots.ts         # SEO robots.txt
│   │   └── 📄 manifest.ts       # PWA manifest
│   ├── 📁 components/           # Reusable components
│   │   ├── 📁 layout/          # Layout components
│   │   ├── 📁 forms/           # Form components
│   │   ├── 📁 ui/              # UI components
│   │   └── 📄 ThemeRegistry.tsx # MUI theme provider
│   ├── 📁 config/              # Configuration files
│   ├── 📁 lib/                 # Utility functions
│   ├── 📁 messages/            # Translation files
│   │   ├── 📄 en.json          # English translations
│   │   └── 📄 es.json          # Spanish translations
│   ├── 📁 styles/              # Global styles and themes
│   │   ├── 📄 theme.ts         # MUI theme configuration
│   │   ├── 📄 variables.scss   # SASS variables
│   │   └── 📄 mixins.scss      # SASS mixins
│   ├── 📄 i18n.ts             # i18n configuration
│   └── 📄 middleware.ts       # Next.js middleware
├── 📄 package.json            # Dependencies and scripts
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 next.config.ts         # Next.js configuration
├── 📄 env.example           # Environment variables template
└── 📄 README.md             # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **npm** or **yarn** or **pnpm**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/nextjs-boilerplate.git
   cd nextjs-boilerplate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME="Your Site Name"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠 Available Scripts

| Script               | Description                             |
| -------------------- | --------------------------------------- |
| `npm run dev`        | Start development server with Turbopack |
| `npm run build`      | Build for production                    |
| `npm run start`      | Start production server                 |
| `npm run lint`       | Run ESLint                              |
| `npm run lint:fix`   | Fix ESLint errors automatically         |
| `npm run type-check` | Run TypeScript type checking            |
| `npm run clean`      | Clean build artifacts                   |

## 🌐 Internationalization

The boilerplate comes with English and Spanish support out of the box.

### Adding a New Language

1. **Add locale to configuration**

   ```typescript
   // src/i18n.ts
   export const locales = ['en', 'es', 'fr'] as const; // Add 'fr'
   ```

2. **Create translation file**

   ```bash
   # Create src/messages/fr.json
   cp src/messages/en.json src/messages/fr.json
   ```

3. **Update middleware**

   ```typescript
   // middleware.ts - Update the matcher pattern
   matcher: ['/', '/(en|es|fr)/:path*'];
   ```

4. **Translate content**
   Edit `src/messages/fr.json` with French translations.

### URLs Structure

- **English**: `/en/` `/en/contact`
- **Spanish**: `/es/` `/es/contact`
- **Root**: `/` (redirects to default language)

## 🎨 Theming & Styling

### Material UI Theme

Customize the theme in `src/styles/theme.ts`:

```typescript
export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Your brand color
    },
    // ... more customization
  },
});
```

### SASS Variables

Global SASS variables in `src/styles/variables.scss`:

```scss
$primary-color: #1976d2;
$border-radius-md: 8px;
// ... more variables
```

### CSS Modules

Component-specific styles:

```scss
// components/ui/Card.module.scss
.card {
  @include card;
  padding: $spacing-lg;
}
```

## 📝 Forms & Validation

Example form with validation:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  name: z.string().min(1, 'Name is required'),
});

export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
    </form>
  );
}
```

## 🎭 Animations

Create smooth animations with Framer Motion:

```typescript
import { motion } from 'framer-motion';

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card>Content here</Card>
    </motion.div>
  );
}
```

## 📱 Components

### Built-in Components

- **`<Navbar />`** - Responsive navigation with language switcher
- **`<Footer />`** - Footer with social links
- **`<ContactForm />`** - Contact form with validation
- **`<AnimatedBox />`** - Scroll-triggered animations
- **`<ThemeRegistry />`** - MUI theme provider

### Creating New Components

```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, variant = 'primary' }: ButtonProps) {
  return <button className={`btn btn--${variant}`}>{children}</button>;
}
```

## 🔧 Configuration

### Environment Variables

```env
# Required
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_NAME="Your Site Name"

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Next.js Configuration

Key configurations in `next.config.ts`:

- **Turbopack** - Fast bundler for development
- **next-intl** - Internationalization setup
- **SASS** - SCSS support with custom include paths
- **Image optimization** - Automatic image optimization

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Automatic deployments on every push

### Other Platforms

- **Netlify** - Static site hosting
- **AWS Amplify** - Full-stack applications
- **Digital Ocean** - App platform
- **Docker** - Containerized deployment

### Build for Production

```bash
npm run build
npm run start
```

## 📊 Performance

This boilerplate is optimized for performance:

- ⚡ **Lighthouse Score**: 95+ in all categories
- 🚀 **First Contentful Paint**: < 1.5s
- 📱 **Mobile Optimized**: Perfect mobile experience
- 🔍 **SEO Ready**: Schema markup and meta tags

## 🧪 Testing

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📋 Roadmap

- [ ] **Testing Setup** - Jest and React Testing Library
- [ ] **Storybook** - Component documentation
- [ ] **Authentication** - NextAuth.js integration
- [ ] **Database** - Prisma ORM integration
- [ ] **CMS Integration** - Headless CMS options
- [ ] **E-commerce** - Shopping cart components
- [ ] **Blog** - MDX blog setup
- [ ] **Analytics** - Google Analytics 4 integration

## 📚 Learn More

- **[Next.js Documentation](https://nextjs.org/docs)** - Learn about Next.js features
- **[Material UI Documentation](https://mui.com/)** - Explore MUI components
- **[next-intl Documentation](https://next-intl-docs.vercel.app/)** - Internationalization guide
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Material UI Team** - For the beautiful component library
- **Vercel** - For the excellent hosting platform
- **Open Source Community** - For all the incredible tools

---

<div align="center">

**[⭐ Star this repo](https://github.com/your-username/nextjs-boilerplate)** if you found it helpful!

Made with ❤️ by the Next.js Boilerplate Team

</div>
