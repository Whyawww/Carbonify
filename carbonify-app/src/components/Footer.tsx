import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-700/50 text-gray-400 py-12 px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Kolom 1: Logo dan Copyright */}
        <div className="space-y-4">
          <Link href="/" className="font-bold text-2xl text-white">
            Carbonify
          </Link>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Carbonify. <br />
            Dibuat untuk Technology <br></br> Innovative Challenge 8.0
          </p>
        </div>

        {/* Kolom 2: Navigasi Utama */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Navigasi</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-400 transition-colors">
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/calculate"
                className="hover:text-green-400 transition-colors"
              >
                Kalkulator
              </Link>
            </li>
            <li>
              <Link
                href="/actions"
                className="hover:text-green-400 transition-colors"
              >
                Aksi Nyata
              </Link>
            </li>
            <li>
              <Link
                href="/map"
                className="hover:text-green-400 transition-colors"
              >
                Peta Lokal
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Perusahaan */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Perusahaan</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/about"
                className="hover:text-green-400 transition-colors"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="hover:text-green-400 transition-colors"
              >
                Tim
              </Link>
            </li>
            <li>
              <Link
                href="/community"
                className="hover:text-green-400 transition-colors"
              >
                Komunitas
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-green-400 transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-green-400 transition-colors"
              >
                Hubungi Kami
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 4: Media Sosial */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Ikuti Kami</h3>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/Whyawww/Carbonify"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaGithub size={24} />
            </Link>
            <Link
              href="https://www.instagram.com/jiw.codes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://linkedin.com/in/wahyu-aji-nusantara"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
