'use client';

import Image from 'next/image';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Raihan Aly Zaky',
    role: 'Front-End Developer',
    image: '/images/rehan.png',
    socialMedia: {
      github: 'https://github.com/rhnalyz',
      instagram: 'https://instagram.com/rhnaly',
      linkedin: 'https://linkedin.com/in/raihanaly'
    }
  },
  {
    name: 'Wahyu Aji Nusantara',
    role: 'Full-Stack Developer',
    image: '/images/Aji.png',
    socialMedia: {
      github: 'https://github.com/Whyawww',
      instagram: 'https://instagram.com/jiw.codes',
      linkedin: 'https://linkedin.com/in/wahyu-aji-nusantara'
    }
  },
  {
    name: 'M. Yoanan Pradipta D',
    role: 'Back-End Developer',
    image: '/images/Dewan.png',
    socialMedia: {
      github: 'https://github.com/pradiptadewan',
      instagram: 'https://instagram.com/pradiptadwn_',
      linkedin: 'https://linkedin.com/in/yoanan-pradipta-dewandaru'
    }
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen w-full pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Our Story Section */}
        <section className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
            Cerita Kami
          </h1>
          
          <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl">
            <div className="bg-gray-900/80 backdrop-blur-lg p-8 md:p-12 rounded-2xl">
              <p className="text-gray-300 text-lg leading-relaxed">
                Kami adalah sekelompok mahasiswa dari Universitas Amikom Yogyakarta, program studi S1 Informatika dengan konsentrasi di bidang pemrograman. Berawal dari ketertarikan kami terhadap teknologi dan isu-isu global, kami berkomitmen untuk mengembangkan solusi digital yang tidak hanya inovatif, tetapi juga berdampak nyata bagi masyarakat. Melalui kolaborasi, pembelajaran, dan semangat eksplorasi, kami terus mengasah kemampuan kami dalam pengembangan perangkat lunak.
                <br /><br />
                Kami percaya, perubahan besar dimulai dari langkah kecil yang dilakukan bersama.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Tim Kami
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Image Container */}
                <div className="w-full h-[400px] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white p-6 rounded-b-2xl">
                  <h3 className="text-xl font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-200 mb-4">
                    {member.role}
                  </p>
                  
                  {/* Social Media Links */}
                  <div className="flex space-x-4">
                    <a 
                      href={member.socialMedia.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub ${member.name}`}
                      className="hover:text-gray-200 transition-all duration-200 hover:scale-110 transform"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>

                    <a 
                      href={member.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Instagram ${member.name}`}
                      className="hover:text-gray-200 transition-all duration-200 hover:scale-110 transform"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>

                    <a 
                      href={member.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`LinkedIn ${member.name}`}
                      className="hover:text-gray-200 transition-all duration-200 hover:scale-110 transform"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}