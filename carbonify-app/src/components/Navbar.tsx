'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle, FaIdCard, FaSignOutAlt, FaGift } from 'react-icons/fa'; // Menambahkan ikon baru
import Image from 'next/image';
import { useGamification } from '@/context/GamificationContext';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { score, isLoggedIn, avatarUrl, logout } = useGamification();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
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

        {/* Profile Dropdown atau Tombol Masuk */}
        <div className="hidden md:flex items-center">
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 bg-gray-800/50 p-1 rounded-full hover:bg-gray-700/70"
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Foto Profil"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-green-400" />
                )}
              </button>
              {isProfileOpen && (
                <div className="absolute top-12 right-0 w-48 bg-gray-800 border border-gray-600 rounded-xl shadow-lg p-2 space-y-1 z-50 animate-dropdown">
                  <div className="px-2 py-1 text-sm text-gray-400 border-b border-gray-700 mb-1">
                    Poin: <strong>{score}</strong>
                  </div>
                  {/* --- PERUBAHAN DI SINI (DESKTOP) --- */}
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-600"
                  >
                    <FaIdCard />
                    <span>Lihat Profil</span>
                  </Link>
                  <Link
                    href="/redeem"
                    className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-green-600"
                  >
                    <FaGift />
                    <span>Tukarkan Poin</span>
                  </Link>
                  <div className="pt-1 border-t border-gray-700">
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-red-600"
                    >
                      <FaSignOutAlt />
                      <span>Keluar</span>
                    </button>
                  </div>
                  {/* --- AKHIR PERUBAHAN --- */}
                </div>
              )}
            </div>
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
            {isMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
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
          <div className="pt-4 mt-2 border-t border-gray-600 w-4/5 text-center space-y-4">
            {isLoggedIn ? (
              <>
                {/* --- PERUBAHAN DI SINI (MOBILE) --- */}
                <Link
                  href="/profile"
                  className="flex items-center justify-center space-x-2 text-xl font-medium text-white"
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="Foto Profil"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-green-400" />
                  )}
                  <span>Lihat Profil</span>
                </Link>
                 <Link
                  href="/redeem"
                  className="text-xl font-medium text-white"
                >
                  Tukarkan Poin
                </Link>
                {/* --- AKHIR PERUBAHAN --- */}
                <button
                  onClick={logout}
                  className="block w-full bg-red-500 hover:bg-red-600 text-white text-center font-bold py-3 rounded-lg transition"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block w-full bg-green-500 hover:bg-green-600 text-white text-center font-bold py-3 rounded-lg transition"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;