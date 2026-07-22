'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="h-11 w-11 rounded-full bg-background/20 backdrop-blur-xl border border-border/10 shadow-lg hover:bg-background/40 transition-all group"
    >
      {/* Sun icon for light mode */}
      <Sun className="h-5 w-5 absolute rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 group-hover:text-primary" />
      {/* Moon icon for dark mode */}
      <Moon className="h-5 w-5 absolute rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 group-hover:text-primary" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
