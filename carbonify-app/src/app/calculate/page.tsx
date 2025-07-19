'use client';

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';

// Tipe data untuk pilihan dari API
interface Choice {
  id: number;
  provinsi?: string;
  jenis_kendaraan?: string;
  jenis_makanan?: string;
}

// Tipe data untuk rincian emisi
interface Breakdown {
  listrik: number;
  transportasi: number;
  konsumsi: number;
}

// Tipe data untuk hasil analisis dari API
interface AnalysisResult {
  exceeded_categories: string[]; // ✅ DIPERBAIKI: dari never[] menjadi string[]
  limit: number;
  is_over_limit: boolean;
  excess_details: {
    category: string;
    emoji: string;
    message: string;
  }[];
}

export default function CalculatorPage() {
  const [values, setValues] = useState({
    listrik_kwh: '',
    transportasi_km: '',
    makanan_porsi: '',
    listrik_id: '',
    transportasi_id: '',
    makanan_id: '',
  });

  const [choices, setChoices] = useState<{
    listrik: Choice[];
    transportasi: Choice[];
    makanan: Choice[];
  }>({
    listrik: [],
    transportasi: [],
    makanan: [],
  });

  const [totalEmissions, setTotalEmissions] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const [listrikRes, transRes, makananRes] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/v1/choices/listrik/'),
          fetch('http://127.0.0.1:8000/api/v1/choices/transportasi/'),
          fetch('http://127.0.0.1:8000/api/v1/choices/makanan/'),
        ]);
        if (!listrikRes.ok || !transRes.ok || !makananRes.ok) {
          throw new Error('Gagal memuat data pilihan.');
        }
        const listrik = await listrikRes.json();
        const transportasi = await transRes.json();
        const makanan = await makananRes.json();
        setChoices({ listrik, transportasi, makanan });
      } catch (err) {
        if (err instanceof Error) {
          setError(
            `Gagal memuat pilihan dari server: ${err.message}. Pastikan backend berjalan.`,
          );
        }
      }
    };
    fetchChoices();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/calculate/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Terjadi kesalahan');

      setTotalEmissions(result.totalEmissions);
      setBreakdown(result.breakdown);
      setAnalysis(result.analysis);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetCalculator = () => {
    setTotalEmissions(null);
    setBreakdown(null);
    setAnalysis(null);
    setError(null);
    setValues({
      listrik_kwh: '',
      transportasi_km: '',
      makanan_porsi: '',
      listrik_id: '',
      transportasi_id: '',
      makanan_id: '',
    });
  };

  const renderResult = () => {
    if (!analysis || !breakdown) return null;

    const categoriesOverLimit = analysis.exceeded_categories || [];

    let actionLink = '/actions';
    let actionText = 'Lihat Semua Aksi';
    let actionButtonClass = 'bg-cyan-500 hover:bg-cyan-600';

    if (analysis.is_over_limit && categoriesOverLimit.length > 0) {
      // ✅ DIPERBAIKI: Filter kategori kosong sebelum digabungkan
      const validCategories = categoriesOverLimit.filter(cat => cat); 
      
      if (validCategories.length > 0) {
        actionLink = `/calculate/recommendations?categories=${validCategories.join(',')}`;
        actionText = 'Lihat Cara Menguranginya';
        actionButtonClass = 'bg-yellow-500 hover:bg-yellow-600';
      }
    }

    const cardContainerClass = analysis.is_over_limit
      ? "p-[1px] bg-gradient-to-br from-yellow-400/50 to-red-400/50 rounded-2xl"
      : "p-[1px] bg-gradient-to-br from-green-400/50 to-cyan-400/50 rounded-2xl";
    
    const cardHeaderClass = analysis.is_over_limit
      ? "text-2xl font-bold mb-2 text-yellow-300"
      : "text-2xl font-bold mb-2 text-green-300";
      
    const cardHeaderText = analysis.is_over_limit
      ? "⚠️ Peringatan: Jejak Karbon Tinggi"
      : "🎉 Penggunaan Karbon Anda Aman!";

    const cardSubText = analysis.is_over_limit
      ? `Hasil Anda melebihi batas wajar (${analysis.limit} kg). Mari kita lihat area yang bisa diperbaiki.`
      : `Hasil Anda berada di bawah batas wajar (${analysis.limit} kg). Pertahankan gaya hidup ramah lingkungan Anda!`;

    return (
      <div className={cardContainerClass}>
        <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl grid md:grid-cols-2 md:gap-8">
          
          <div className="text-center md:text-left flex flex-col justify-between">
            <div>
              <h2 className={cardHeaderClass}>{cardHeaderText}</h2>
              <p className="text-5xl lg:text-6xl font-bold text-white mb-4">
                {totalEmissions?.toFixed(2)}
                <span className="text-xl lg:text-2xl align-baseline ml-2">kg CO₂e / bulan</span>
              </p>
              <p className="text-gray-300 mb-6">{cardSubText}</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4">
              <Link href={actionLink} className={`w-full lg:w-auto font-bold py-3 px-6 rounded-md transition-colors ${actionButtonClass}`}>
                {actionText}
              </Link>
              <button onClick={resetCalculator} className="w-full lg:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-md">
                Hitung Ulang
              </button>
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:border-l md:border-gray-700 md:pl-8">
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-xl font-semibold mb-3 text-white">Rincian Emisi Anda</h3>
              <div className="text-lg text-gray-300 w-full space-y-3">
                  <p className={`flex justify-between items-center ${categoriesOverLimit.includes('Listrik') ? 'text-yellow-400 font-semibold' : ''}`}>
                      <span>⚡️ Listrik</span>
                      <strong>{breakdown.listrik.toFixed(2)} kg CO₂e</strong>
                  </p>
                  <p className={`flex justify-between items-center ${categoriesOverLimit.includes('Transportasi') ? 'text-yellow-400 font-semibold' : ''}`}>
                      <span>🚗 Transportasi</span>
                      <strong>{breakdown.transportasi.toFixed(2)} kg CO₂e</strong>
                  </p>
                  <p className={`flex justify-between items-center ${categoriesOverLimit.includes('Konsumsi') ? 'text-yellow-400 font-semibold' : ''}`}>
                      <span>🍔 Konsumsi</span>
                      <strong>{breakdown.konsumsi.toFixed(2)} kg CO₂e</strong>
                  </p>
              </div>
            </div>
            
            {analysis.is_over_limit && (
               <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-3 text-white">Rekomendasi</h3>
                  <div className="space-y-3">
                      {analysis.excess_details.map(detail => (
                          <div key={detail.category} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                              <span className="text-2xl pt-1">{detail.emoji}</span>
                              <p className="text-gray-300 text-sm">{detail.message}</p>
                          </div>
                      ))}
                  </div>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          Kalkulator Jejak Karbon
        </h1>
        <TypeAnimation
          sequence={[
            'Cari tahu estimasi jejak karbon bulananmu dengan lebih akurat.',
            2000,
          ]}
          wrapper="p"
          speed={50}
          className="text-center text-gray-400 mb-10 text-lg"
          repeat={0}
        />

        {!analysis ? (
          <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl space-y-6"
            >
              <div>
                <label className="block text-lg font-medium mb-2">Listrik</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="listrik_id" value={values.listrik_id} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500">
                    <option value="">Pilih Provinsi/Jaringan</option>
                    {choices.listrik.map((c) => (<option key={c.id} value={c.id}>{c.provinsi}</option>))}
                  </select>
                  <input type="number" name="listrik_kwh" value={values.listrik_kwh} placeholder="Konsumsi (kWh)" onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500"/>
                </div>
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">Transportasi</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="transportasi_id" value={values.transportasi_id} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500">
                    <option value="">Pilih Jenis Kendaraan</option>
                    {choices.transportasi.map((c) => (<option key={c.id} value={c.id}>{c.jenis_kendaraan}</option>))}
                  </select>
                  <input type="number" name="transportasi_km" value={values.transportasi_km} placeholder="Jarak Tempuh (km)" onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500"/>
                </div>
              </div>
              <div>
                <label className="block text-lg font-medium mb-2">Konsumsi Makanan</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="makanan_id" value={values.makanan_id} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500">
                    <option value="">Pilih Jenis Makanan</option>
                    {choices.makanan.map((c) => (<option key={c.id} value={c.id}>{c.jenis_makanan}</option>))}
                  </select>
                  <input type="number" name="makanan_porsi" value={values.makanan_porsi} placeholder="Jumlah (kg/bulan)" onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500"/>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full font-bold py-3 px-6 rounded-md transition-all duration-300 text-white text-lg disabled:opacity-50 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600">
                {isLoading ? 'Menghitung...' : 'Hitung Sekarang'}
              </button>
              {error && (<p className="text-red-400 mt-4 text-center">{error}</p>)}
            </form>
          </div>
        ) : (
          renderResult()
        )}
      </div>
    </div>
  );
}