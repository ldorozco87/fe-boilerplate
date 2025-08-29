import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:jsx-a11y/recommended'
  ),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'coverage/**',
      'next-env.d.ts',
      '*.config.js',
      '*.config.mjs',
    ],
  },
  {
    rules: {
      // Reglas adicionales para mejor feedback
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/no-unescaped-entities': 'warn',
      'react-hooks/exhaustive-deps': 'warn',

      // Prevenir errores de hidratación críticos
      'react/no-danger-with-children': 'error',
      'react/no-children-prop': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-unescaped-entities': 'error',

      // Asegurar elementos HTML válidos y evitar anidación incorrecta
      'react/button-has-type': 'warn',
      'react/no-unknown-property': 'warn',
      'react/void-dom-elements-no-children': 'error',

      // Reglas específicas para prevenir errores de hidratación
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/self-closing-comp': 'warn',

      // Reglas de accesibilidad que también previenen errores de hidratación
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/no-redundant-roles': 'error',

      // Reglas específicas para Next.js y hidratación
      // (Las reglas de @next/next están definidas arriba)

      // Detectar patrones que pueden causar errores de hidratación
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
    },
  },
];

export default eslintConfig;
