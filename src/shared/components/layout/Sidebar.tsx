'use client';

import * as React from 'react';
import { Home, Map as MapIcon, Bell, Heart, Wind, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: MapIcon, label: 'Map', href: '/map' },
    { icon: Bell, label: 'Alerts', href: '/alerts' },
    { icon: Heart, label: 'Favorites', href: '/favorites' },
    { icon: Wind, label: 'Air Quality', href: '/air-quality' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <nav className="hidden lg:flex flex-col items-center py-8 w-[80px] h-screen fixed left-0 top-0 border-r border-border/10 bg-background/40 backdrop-blur-3xl z-40">
      <div className="mb-12">
        {/* App Logo could go here, or a glowing orb */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center">
          <CloudIcon />
        </div>
      </div>
      
      <div className="flex flex-col gap-6 flex-1 w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1.5 mx-2 py-2 rounded-2xl transition-all duration-300
                ${isActive 
                  ? 'bg-foreground/10 text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'}`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function CloudIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}
