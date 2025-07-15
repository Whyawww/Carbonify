'use client';

import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulasi pengiriman data
    console.log('Data yang dikirim:', formData);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Terima kasih! Pesan Anda telah terkirim.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">Hubungi Kami</h1>
        <TypeAnimation
          sequence={['Punya pertanyaan atau masukan? Kami siap mendengar.', 2000]}
          wrapper="p"
          speed={50}
          className="text-center text-gray-400 mb-12 text-lg"
          repeat={0}
        />

        <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl">
          <form onSubmit={handleSubmit} className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">Nama</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500"/>
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-lg font-medium mb-2">Subjek</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-2">Pesan</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500"></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full font-bold py-3 px-6 rounded-md transition-all duration-300 text-white text-lg disabled:opacity-50 bg-gradient-to-r from-green-400 to-cyan-400 hover:from-green-700 hover:to-cyan-700">
              {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
            {submitMessage && <p className="text-green-400 mt-4 text-center">{submitMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}