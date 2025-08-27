import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from '../components/layout/Footer/Footer';

// Crear un tema básico para los tests
const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Footer Component', () => {
  it('renders footer content', () => {
    renderWithTheme(<Footer />);

    // Verificar que el logo/título esté presente
    expect(screen.getByText('🚀 Boilerplate')).toBeInTheDocument();

    // Verificar que las secciones principales estén presentes
    expect(screen.getByText('Producto')).toBeInTheDocument();
    expect(screen.getByText('Empresa')).toBeInTheDocument();
    expect(screen.getByText('Recursos')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('renders current year in copyright', () => {
    renderWithTheme(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${currentYear} Boilerplate. Todos los derechos reservados.`
      )
    ).toBeInTheDocument();
  });

  it('renders social media links', () => {
    renderWithTheme(<Footer />);

    // Verificar que los enlaces sociales estén presentes
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});
