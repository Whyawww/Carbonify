'use client';

import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { FaPlus, FaMinus } from 'react-icons/fa';

const faqData = [
  {
    question: 'Apa itu Carbonify?',
    answer:
      'Carbonify adalah platform web interaktif yang membantu Anda memahami, menghitung, dan mengurangi jejak karbon pribadi Anda melalui berbagai fitur edukatif dan tantangan ramah lingkungan.',
  },
  {
    question: 'Apakah data saya aman?',
    answer:
      'Ya, kami sangat menjaga privasi Anda. Data perhitungan dan aktivitas Anda dikelola dengan aman. Untuk login, kami menggunakan sistem otentikasi Google yang terstandarisasi untuk memastikan keamanan akun Anda.',
  },
  {
    question: 'Bagaimana cara poin dihitung?',
    answer:
      'Poin diberikan setiap kali Anda menyelesaikan tantangan yang tersedia di halaman utama atau berpartisipasi dalam aksi-aksi tertentu. Setiap tantangan memiliki nilai poin yang berbeda-beda.',
  },
  {
    question: 'Apakah penukaran poin dengan saldo benar-benar berfungsi?',
    answer:
      'Untuk saat ini, fitur penukaran poin adalah simulasi untuk keperluan demonstrasi dalam kompetisi. Namun, ini adalah bagian dari visi jangka panjang kami untuk memberikan imbalan nyata bagi para pahlawan iklim.',
  },
  {
    question: 'Bagaimana saya bisa berkontribusi?',
    answer:
      'Anda bisa berkontribusi dengan aktif menggunakan platform ini, membagikannya kepada teman, atau jika Anda menemukan lokasi ramah lingkungan baru, Anda bisa menyarankannya melalui halaman "Hubungi Kami".',
  },
];

const FaqItem = ({ item }: { item: { question: string; answer: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-4">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{item.question}</span>
        <span>{isOpen ? <FaMinus /> : <FaPlus />}</span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-400">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};

export default function FaqPage() {
  return (
    <div className="min-h-screen w-full pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
          Frequently Asked Questions (FAQ)
        </h1>
        <TypeAnimation
          sequence={['Jawaban atas pertanyaan yang sering diajukan.', 2000]}
          wrapper="p"
          speed={50}
          className="text-center text-gray-400 mb-12 text-lg"
          repeat={0}
        />

        <div className="bg-gray-900/30 backdrop-blur-lg border border-green-700 p-8 rounded-2xl">
          {faqData.map((item, index) => (
            <FaqItem key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
