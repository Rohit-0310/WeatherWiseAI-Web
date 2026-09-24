'use client';

import * as React from 'react';
import { Home, Sparkles, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SettingsModal } from '../settings/SettingsModal';
import { ThemeToggle } from './ThemeToggle';

export function MobileNav() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Sparkles, label: 'AI Summary', href: '/ai-summary' },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full z-40 md:hidden px-4 pb-6 pt-2 pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-around py-3 px-2 rounded-full border border-border/20 bg-background/60 backdrop-blur-3xl shadow-[0_10px_40px_rgba(0,0,0,0.2)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-foreground/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
                title={item.label}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </Link>
            );
          })}

          {/* Theme Toggle (Custom styled for this bar) */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all">
            <ThemeToggle />
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            title="Settings"
          >
            <Settings className="w-5 h-5" strokeWidth={2} />
          </button>
        </nav>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}
