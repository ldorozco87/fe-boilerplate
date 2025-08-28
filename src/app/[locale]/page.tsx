'use client';

import { Box } from '@mui/material';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ShowcaseSection from '@/components/sections/ShowcaseSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <Box sx={{ pt: 8 }}> {/* Add padding top for fixed navbar */}
      <HeroSection />
      <AboutSection />
      <ShowcaseSection />
      <ContactSection />
    </Box>
  );
}
