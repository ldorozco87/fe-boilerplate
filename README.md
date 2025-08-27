# 🚀 FE Boilerplate

Un boilerplate moderno y robusto para proyectos frontend construido con **Next.js 15**, **TypeScript**, **Material-UI (MUI)** y **Zustand**.

## ✨ **Características Principales**

- **⚡ Next.js 15.5.1** - Framework React más reciente con App Router
- **⚛️ React 19.1.1** - Biblioteca de UI más reciente
- **🔷 TypeScript 5.3.3** - Tipado estático completo
- **🎨 Material-UI 7.3.1** - Sistema de diseño profesional
- **📱 Responsive Design** - Optimizado para móviles y desktop
- **♿ Accesibilidad** - Cumple estándares WCAG
- **🔍 SEO Optimizado** - Metadatos y estructura semántica
- **📦 Zustand** - Gestión de estado ligera y eficiente
- **🛠️ ESLint + Prettier** - Código limpio y formateado
- **🧪 Testing Setup** - Jest + React Testing Library configurados
- **📁 Estructura Organizada** - Arquitectura escalable y mantenible

## 🚀 **Tecnologías Utilizadas**

### **Core Framework**
- **Next.js 15.5.1** - React Framework con App Router
- **React 19.1.1** - Biblioteca de UI más reciente
- **TypeScript 5.3.3** - JavaScript tipado

### **UI & Styling**
- **Material-UI (MUI) 7.3.1** - Componentes de UI profesionales
- **Emotion** - CSS-in-JS para MUI
- **Material Icons** - Iconografía consistente

### **State Management**
- **Zustand 5.0.8** - Gestión de estado minimalista

### **Development Tools**
- **ESLint** - Linting de código
- **Prettier** - Formateo automático
- **TypeScript ESLint** - Reglas específicas para TS
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes React

## 📁 **Estructura del Proyecto**

```
fe-boilerplate/
├── app/                          # App Router (Next.js 15)
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Página de inicio
│   ├── about/page.tsx           # Página About
│   ├── contact/page.tsx         # Página Contact
│   ├── login/page.tsx           # Página Login
│   ├── signup/page.tsx          # Página Sign Up
│   ├── providers.tsx            # Providers de MUI
│   ├── theme.ts                 # Tema personalizado
│   ├── viewport.ts              # Configuración viewport
│   └── globals.css              # Estilos globales
├── src/
│   ├── components/              # Componentes reutilizables
│   │   └── layout/             # Componentes de layout
│   │       ├── Navbar/         # Sistema de navegación
│   │       │   ├── Navbar.tsx      # Navbar principal
│   │       │   ├── NavbarLogo.tsx  # Logo del navbar
│   │       │   ├── NavbarMenu.tsx  # Menú de navegación
│   │       │   └── NavbarDrawer.tsx # Drawer móvil
│   │       └── index.ts        # Exportaciones
│   ├── stores/                  # Estado global (Zustand)
│   │   └── navbarStore.ts      # Estado del navbar
│   ├── types/                   # Definiciones de tipos
│   │   ├── navbar.ts           # Tipos del navbar
│   │   └── index.ts            # Exportaciones
│   ├── constants/               # Constantes del proyecto
│   │   ├── navigation.ts        # Items de navegación
│   │   └── index.ts            # Exportaciones
│   └── __tests__/               # Tests básicos
│       ├── basic.test.ts        # Tests de verificación
│       └── README.md            # Documentación de tests
├── .eslintrc.json               # Configuración ESLint
├── .prettierrc                  # Configuración Prettier
├── .prettierignore              # Archivos ignorados por Prettier
├── next.config.js               # Configuración Next.js
├── tsconfig.json                # Configuración TypeScript
└── package.json                 # Dependencias y scripts
```

## 🎯 **Funcionalidades Implementadas**

### **🌐 Sistema de Navegación**
- **Navbar Responsive** - Adaptable a móviles y desktop
- **Navegación Principal** - Home, About, Contact
- **Botones de Acción** - Login, Sign Up
- **Drawer Móvil** - Menú hamburguesa para dispositivos móviles
- **Estado Global** - Gestión del estado del navbar con Zustand

### **📱 Páginas Implementadas**
- **🏠 Home** - Landing page principal con características del boilerplate
- **ℹ️ About** - Página de información del proyecto
- **📞 Contact** - Página de contacto
- **🔐 Login** - Página de inicio de sesión
- **👤 Sign Up** - Página de registro

### **🎨 Sistema de Diseño**
- **Tema Personalizado** - Colores, tipografía y componentes MUI
- **Componentes Consistentes** - Cards, botones, iconos uniformes
- **Responsive Grid** - Layout adaptable a diferentes tamaños
- **Accesibilidad** - ARIA labels, roles y navegación por teclado

### **🛠️ Herramientas de Desarrollo**
- **ESLint** - Reglas de código y detección de errores
- **Prettier** - Formateo automático del código
- **TypeScript** - Verificación de tipos en tiempo de compilación
- **Hot Reload** - Recarga automática durante desarrollo
- **Testing Setup** - Jest + React Testing Library configurados y funcionando

## 🚀 **Inicio Rápido**

### **Prerrequisitos**
- **Node.js 18+** (recomendado: última versión LTS)
- **npm** o **yarn**

### **Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone <tu-repositorio>
   cd fe-boilerplate
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📜 **Scripts Disponibles**

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Verificar código con ESLint
npm run lint:fix     # Corregir problemas de ESLint automáticamente

# Formateo
npm run format       # Formatear código con Prettier
npm run format:check # Verificar formato sin cambiar

# Verificación
npm run type-check   # Verificar tipos de TypeScript

# Testing
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Tests con coverage
```

## 🎨 **Personalización**

### **Tema MUI**
Edita `app/theme.ts` para personalizar:
- Colores del tema
- Tipografía
- Componentes específicos
- Espaciado y bordes

### **Navegación**
Modifica `src/constants/navigation.ts` para:
- Agregar/remover páginas
- Cambiar iconos
- Modificar rutas

### **Componentes**
Los componentes están organizados en `src/components/`:
- Estructura modular y reutilizable
- Props tipadas con TypeScript
- Fácil de extender y modificar

## 🔧 **Configuración**

### **ESLint**
- Configuración automática de Next.js
- Reglas para TypeScript y React
- Integración con Prettier

### **Prettier**
- Formateo automático del código
- Reglas consistentes para todo el proyecto
- Integración con ESLint

### **TypeScript**
- Configuración estricta
- Path aliases configurados (`@/*`)
- Soporte completo para Next.js 15

### **Testing**
- **Jest** - Framework de testing configurado
- **React Testing Library** - Testing de componentes React
- **Mocks básicos** - Para Next.js, MUI y Zustand
- **Tests de verificación** - Para confirmar que la configuración funciona
- **Configuración lista** - Para empezar a escribir tests inmediatamente

## 📱 **Responsive Design**

El boilerplate está optimizado para:
- **📱 Móviles** - Drawer de navegación, botones adaptativos
- **💻 Tablets** - Layout intermedio
- **🖥️ Desktop** - Navegación completa, botones de acción visibles

## ♿ **Accesibilidad**

- **ARIA Labels** - Descripciones para lectores de pantalla
- **Navegación por Teclado** - Soporte completo para navegación sin mouse
- **Roles Semánticos** - HTML semántico apropiado
- **Contraste** - Colores que cumplen estándares WCAG

## 🚀 **Despliegue**

### **Vercel (Recomendado)**
```bash
npm run build
# Conectar con Vercel para despliegue automático
```

### **Otros Proveedores**
```bash
npm run build
# El build se genera en la carpeta .next/
```

## 🤝 **Contribución**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 **Agradecimientos**

- **Next.js Team** - Framework increíble
- **Material-UI Team** - Componentes de UI profesionales
- **Zustand Team** - Gestión de estado minimalista
- **Vercel** - Plataforma de despliegue

---

## 🎯 **Próximos Pasos Sugeridos**

- [x] **Testing** - Jest y React Testing Library configurados ✅
- [ ] **Storybook** - Documentación de componentes
- [ ] **CI/CD** - Pipeline de integración continua
- [ ] **PWA** - Funcionalidades de aplicación web progresiva
- [ ] **i18n** - Internacionalización
- [ ] **Dark Mode** - Tema oscuro/claro
- [ ] **Analytics** - Métricas de usuario
- [ ] **Error Boundaries** - Manejo de errores robusto

---

**¡Disfruta construyendo con este boilerplate! 🚀✨**
