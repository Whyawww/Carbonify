'use client';

import { TypeAnimation } from 'react-type-animation';

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Tentang Carbonify</h1>
        <TypeAnimation
          sequence={['Misi kami untuk bumi yang lebih lestari.', 2000]}
          wrapper="p"
          speed={50}
          className="text-center text-gray-400 mb-12 text-lg"
          repeat={0}
        />

        <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl">
          <div className="bg-gray-900/80 backdrop-blur-lg p-8 md:p-12 rounded-2xl space-y-8 text-gray-300 text-lg leading-relaxed">
            <p>
              <strong>Carbonify</strong> lahir dari keprihatinan mendalam terhadap isu perubahan iklim yang dampaknya semakin nyata kita rasakan. Kami percaya bahwa teknologi dapat menjadi jembatan antara kesadaran dan aksi nyata. Proyek ini dikembangkan sebagai bagian dari <strong className="text-white">Technology Innovative Challenge 8.0</strong> dengan tujuan memberdayakan setiap individu untuk memahami dan mengurangi jejak karbon mereka.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-green-400 pl-4">
                Misi Kami
              </h2>
              <p>
                Misi kami adalah menyediakan alat yang mudah diakses dan edukatif bagi masyarakat Indonesia untuk menghitung, memahami, dan mengambil langkah konkret dalam mengurangi emisi karbon pribadi. Kami ingin mengubah data yang kompleks menjadi wawasan yang dapat ditindaklanjuti.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-cyan-400 pl-4">
                Visi Kami
              </h2>
              <p>
                Kami membayangkan masa depan di mana setiap orang memiliki kesadaran penuh akan dampak lingkungan dari gaya hidup mereka dan secara kolektif berkontribusi pada pembangunan yang berkelanjutan, menciptakan bumi yang lebih sehat untuk generasi yang akan datang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}