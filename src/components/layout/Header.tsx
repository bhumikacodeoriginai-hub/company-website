'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { mainNavItems, secondaryNavItems } from '@/data/navigation';
import { Button } from '@/components/ui';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-250 ${
          scrolled
            ? 'bg-white/95 dark:bg-navy/95 backdrop-blur-lg border-b border-gray-200/80 dark:border-white/10 shadow-nav h-16'
            : 'bg-transparent h-[72px]'
        }`}
        role="banner"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50" aria-label="Code Origin.AI Home">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-blue to-brand-electric flex items-center justify-center text-white text-xs font-bold">
              CO
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Code Origin<span className="text-brand-blue dark:text-brand-electric">.AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {mainNavItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
                      onClick={() => toggleDropdown(item.label)}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      aria-expanded={activeDropdown === item.label}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.label && (
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg p-2 z-50"
                        onMouseLeave={() => setActiveDropdown(null)}
                        role="menu"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-electric hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                            role="menuitem"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            {secondaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>
            )}
            <Button href="/contact" size="sm" className="hidden lg:flex">
              Talk to Our Experts
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg z-50"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div
        className={`fixed inset-0 bg-white dark:bg-navy z-40 lg:hidden pt-20 px-6 pb-6 overflow-y-auto transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col gap-1">
          {mainNavItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <div>
                  <button
                    className="w-full flex items-center justify-between py-3 text-lg font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10"
                    onClick={() => toggleDropdown(item.label)}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="pl-4 py-2 flex flex-col gap-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-2 text-base text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-electric"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="block py-3 text-lg font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          {secondaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-lg font-medium text-gray-900 dark:text-white border-b border-gray-100 dark:border-white/10"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <Button href="/contact" size="lg" className="w-full" onClick={() => setMobileOpen(false)}>
            Talk to Our Experts
          </Button>
        </div>
      </div>
    </>
  );
}
