'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaCoins } from 'react-icons/fa';
import Image from 'next/image';
import { useGamification } from '@/context/GamificationContext';
import { useNotification } from '@/context/NotificationContext';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { showNotification } = useNotification();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { score } = useGamification();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      localStorage.removeItem('accessToken');
      setIsLoggedIn(false);

      showNotification('Anda berhasil keluar.', 'success');

      router.push('/');
      router.refresh();
    }
  };

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
    { href: '/leaderboard', label: 'Papan Peringkat' },
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
          <Image src="/Logo.svg" alt="Logo" width={130} height={40} />
        </Link>

        {/* Desktop Navigation */}
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

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full">
                <FaCoins className="text-yellow-400" />
                <span className="font-bold text-white">{score}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Keluar
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Masuk
            </Link>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden z-50 relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="transition-all duration-300"
          >
            {/* ✅ KESALAHAN DI SINI SUDAH DIPERBAIKI */}
            {isMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute top-12 right-0 w-56 bg-gray-800 border border-gray-600 rounded-xl shadow-lg p-4 space-y-4 transition-all duration-200 z-40 animate-dropdown">
              {navLinks.map((link) => (
                <Link
                  key={`mobile-${link.href}`}
                  href={link.href}
                  className="block text-white text-base font-medium hover:text-green-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-gray-600 space-y-4">
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center space-x-2 text-base font-medium">
                      <FaCoins className="text-yellow-400" />
                      <span className="text-white">{score} Poin</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full bg-red-500 hover:bg-red-600 text-white text-center font-bold py-2 rounded-lg transition"
                    >
                      Keluar
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 rounded-lg transition"
                  >
                    Masuk
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
