'use client';

import * as React from 'react';
import { Home, Sparkles, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SettingsModal } from '../settings/SettingsModal';

export function Sidebar() {
  const pathname = usePathname();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Sparkles, label: 'AI Summary', href: '/ai-summary' },
  ];

  return (
    <>
      <nav className="hidden md:flex flex-col items-center py-6 w-16 h-auto fixed left-4 top-1/2 -translate-y-1/2 rounded-full border border-border/20 bg-background/40 backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.1)] z-40">
        <div className="flex flex-col gap-4 flex-1 w-full items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-full transition-all duration-300
                  ${isActive 
                    ? 'bg-foreground/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
                title={item.label}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </Link>
            );
          })}
        </div>

        <div className="mt-8">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-full transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-foreground/5"
            title="Settings"
          >
            <Settings className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </nav>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
}


