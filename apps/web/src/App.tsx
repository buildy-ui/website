import { Block, Container, Button, Title, Text, Stack } from '@ui8kit/core'
import { ThemeProvider, useTheme, lesseUITheme } from '@ui8kit/core' // skyOSTheme, modernUITheme, lesseUITheme

import { SpeedInsights } from '@vercel/speed-insights/react';

// Blocks
"use client";
import {
  Rendery,
  createHeroRegistry,
  SplitHeroPreset
} from "@ui8kit/blocks";

export const TestBlocksPage = () => {
  
  const heroRegistry = createHeroRegistry();

  const simpleHeroPreset = SplitHeroPreset.find(preset => preset.variant === "gallery");

  const blocksTree = simpleHeroPreset ? [simpleHeroPreset] : [];

  return (
    <Rendery registry={heroRegistry as any} tree={blocksTree} />
  );
};

function AppContent() {
  const { toggleDarkMode, isDarkMode } = useTheme()

  return (
    <>
    <Block variant="section" py="xl">
      <Container>
      <Stack gap="lg" align="center" ta="center">
      <Title size="4xl">Welcome to UI8Kit</Title>
      <Text>Create beautiful web applications with ease using our UI components</Text>
        <Button variant={isDarkMode ? 'primary' : 'secondary'} onClick={toggleDarkMode}>
          {!isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Button>
        </Stack>
      </Container>
    </Block>
    <TestBlocksPage />
    <SpeedInsights />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={lesseUITheme}>
      <AppContent />
    </ThemeProvider>
  )
}
