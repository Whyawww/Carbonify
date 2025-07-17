'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { FaDiscord } from 'react-icons/fa';

// Array partner komunitas yang sudah diperbarui dengan logo lokal
const communityPartners = [
    { name: 'Kementerian Lingkungan Hidup dan Kehutanan', logo: '/klh.png', link: 'https://www.menlhk.go.id/' },
    { name: 'WWF Indonesia', logo: '/wwf.png', link: 'https://www.wwf.id/' },
    { name: 'Walhi', logo: '/walhi.png', link: 'https://walhi.or.id/' },
];

export default function CommunityPage() {
    return (
        <div className="min-h-screen w-full pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Bergabung dengan Komunitas Carbonify</h1>
                <TypeAnimation
                    sequence={['Bersama kita lebih kuat dalam menciptakan perubahan.', 2000]}
                    wrapper="p"
                    speed={50}
                    className="text-center text-gray-400 mb-16 text-lg"
                    repeat={0}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                    {/* Kartu Bergabung */}
                    <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl">
                        <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl h-full flex flex-col items-center justify-center space-y-4">
                            <FaDiscord size={48} className="text-cyan-400" />
                            <h2 className="text-2xl font-bold text-white">Gabung Diskusi di Discord</h2>
                            <p className="text-gray-400">
                                Terhubung dengan anggota lain, bagikan ide, dan diskusikan solusi iklim di server Discord kami.
                            </p>
                            <a href="#" className="mt-4 font-bold py-2 px-6 rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                                Gabung Sekarang
                            </a>
                        </div>
                    </div>

                    {/* Kartu Kontribusi dengan logo vercel.svg */}
                    <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl">
                        <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl h-full flex flex-col items-center justify-center space-y-4">
                            <Image
                                src="/vercel.svg" // Path ke logo di folder public
                                alt="Kontributor Logo"
                                width={48}
                                height={48}
                            />
                            <h2 className="text-2xl font-bold text-white">Jadi Kontributor</h2>
                            <p className="text-gray-400">
                                Bantu kami memperbarui data lokasi ramah lingkungan atau berkontribusi pada pengembangan proyek ini.
                            </p>
                            <Link href="/contact" className="mt-4 font-bold py-2 px-6 rounded-md text-white bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>

                 {/* Bagian Partner Komunitas */}
                 <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center mb-8">Partner Komunitas Kami</h2>
                    <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
                        {communityPartners.map(partner => (
                            <a key={partner.name} href={partner.link} target="_blank" rel="noopener noreferrer" title={partner.name} className="grayscale hover:grayscale-0 transition-all duration-300">
                                <Image 
                                    src={partner.logo} 
                                    alt={partner.name} 
                                    width={150}
                                    height={50}
                                    className="h-12 md:h-16 w-auto object-contain"
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}