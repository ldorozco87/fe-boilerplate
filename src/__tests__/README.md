# Tests en el Boilerplate

Este directorio contiene tests básicos para verificar que la configuración de Jest funciona correctamente.

## Configuración Actual

- **Jest**: Configurado con Next.js y jsdom
- **Testing Library**: Para tests de componentes React
- **Mocks básicos**: Para Next.js, MUI y Zustand

## Comandos Disponibles

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test -- --watch

# Ejecutar tests con coverage
npm run test -- --coverage
```

## Estructura Recomendada

Cuando comiences a desarrollar, puedes organizar tus tests así:

```
src/
├── components/
│   └── MyComponent/
│       ├── MyComponent.tsx
│       └── __tests__/
│           └── MyComponent.test.tsx
├── hooks/
│   └── useMyHook/
│       ├── useMyHook.ts
│       └── __tests__/
│           └── useMyHook.test.ts
└── utils/
    └── myUtil/
        ├── myUtil.ts
        └── __tests__/
            └── myUtil.test.ts
```

## Tests Básicos

Los tests actuales son solo para verificar que Jest funciona. Puedes eliminarlos cuando comiences a desarrollar tus propios tests.

## Consejos

1. **Mantén los tests simples** al principio
2. **Usa mocks** para dependencias externas
3. **Testea la funcionalidad**, no la implementación
4. **Elimina tests innecesarios** si complican el desarrollo
