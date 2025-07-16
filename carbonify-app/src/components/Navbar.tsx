'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/calculate', label: 'Kalkulator' },
    { href: '/actions', label: 'Aksi Nyata' },
    { href: '/map', label: 'Peta Lokal' },
  ];

  return (
    <>
      <nav
        className={`
          w-full max-w-6xl mx-auto text-white flex justify-between items-center fixed top-4 left-0 right-0 z-50
          transition-all duration-300
          ${
            isScrolled
              ? 'rounded-full py-3 px-6 bg-transparent border-2 border-green-500 backdrop-filter backdrop-blur-lg'
              : 'rounded-none py-5 px-8 bg-transparent'
          }
        `}
      >
        <Link href="/">       
            <Image src="Logo.svg" alt="Logo" width={120} height={40}/>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative hover:text-gray-200 transition-colors ${
                  isActive
                    ? 'font-semibold bg-gradient-to-r from-green-400 to-cyan-400 text-transparent bg-clip-text'
                    : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-green-400 to-cyan-400"></span>
                )}
              </Link>
            );
          })}
        </div>

        <Link
          href="/actions"
          className="hidden md:block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Mulai Aksi
        </Link>

        <div className="md:hidden z-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900/90 backdrop-blur-xl flex flex-col items-center justify-center space-y-8">
          {navLinks.map((link) => (
            <Link
              key={`mobile-${link.href}`}
              href={link.href}
              className="text-3xl font-semibold text-white hover:text-green-400 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/actions"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-colors"
          >
            Mulai Aksi
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
