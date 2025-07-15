import Link from 'next/link';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>
            &copy; {new Date().getFullYear()} Carbonify. Dibuat untuk Technology
            Innovative Challenge 8.0.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
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
    </footer>
  );
};

export default Footer;
