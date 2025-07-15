'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/calculate', label: 'Kalkulator' },
    { href: '/actions', label: 'Aksi Nyata' },
    { href: '/map', label: 'Peta Lokal' },
  ];

  return (
    <nav
      className={`
        w-full max-w-6xl mx-auto text-white flex justify-between items-center fixed top-4 left-0 right-0 z-40
        transition-all duration-300
        ${
          isScrolled
            ? 'rounded-full py-3 px-6 bg-gradient-to-r from-green-900/70 to-teal-900/70 backdrop-blur-lg'
            : 'rounded-none py-5 px-8 bg-transparent'
        }
      `}
    >
      {/* Logo */}
      <Link href="/" className="font-bold text-2xl">
        Carbonify
      </Link>

      {/* Menu Navigasi */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative hover:text-gray-200 transition-colors
                ${
                  isActive
                    ? 'font-semibold bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text'
                    : ''
                }
              `}
            >
              {link.label}
              {isActive && (
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-green-400 to-cyan-400"></span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Tombol Aksi (CTA) */}
      <Link href="/actions" className="hidden md:block bg-gradient-to-r from-green-400/30 to-cyan-400/30 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
        Mulai Aksi
      </Link>
    </nav>
  );
};

export default Navbar;