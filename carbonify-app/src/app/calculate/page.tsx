'use client';

import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface Choice {
  id: number;
  provinsi?: string;
  jenis_kendaraan?: string;
  jenis_makanan?: string;
}

interface Breakdown {
    listrik: number;
    transportasi: number;
    konsumsi: number;
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
            setError(`Gagal memuat pilihan dari server: ${err.message}. Pastikan backend berjalan.`);
        }
      }
    };
    fetchChoices();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

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
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-2">Kalkulator Jejak Karbon</h1>
        <TypeAnimation sequence={['Cari tahu estimasi jejak karbon bulananmu dengan lebih akurat.', 2000]} wrapper="p" speed={50} className="text-center text-gray-400 mb-10 text-lg" repeat={0} />

        {!totalEmissions ? (
          // Container dengan border gradasi
          <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl">
            <form onSubmit={handleSubmit} className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl space-y-6">
              {/* Listrik */}
              <div>
                <label className="block text-lg font-medium mb-2">Listrik</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="listrik_id" value={values.listrik_id} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500">
                    <option value="">Pilih Provinsi/Jaringan</option>
                    {choices.listrik.map(c => <option key={c.id} value={c.id}>{c.provinsi}</option>)}
                  </select>
                  <input type="number" name="listrik_kwh" value={values.listrik_kwh} placeholder="Konsumsi (kWh)" onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              {/* Transportasi */}
              <div>
                <label className="block text-lg font-medium mb-2">Transportasi</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="transportasi_id" value={values.transportasi_id} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500">
                    <option value="">Pilih Jenis Kendaraan</option>
                    {choices.transportasi.map(c => <option key={c.id} value={c.id}>{c.jenis_kendaraan}</option>)}
                  </select>
                  <input type="number" name="transportasi_km" value={values.transportasi_km} placeholder="Jarak Tempuh (km)" onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              {/* Makanan */}
              <div>
                <label className="block text-lg font-medium mb-2">Konsumsi Makanan</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="makanan_id" value={values.makanan_id} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500">
                    <option value="">Pilih Jenis Makanan</option>
                    {choices.makanan.map(c => <option key={c.id} value={c.id}>{c.jenis_makanan}</option>)}
                  </select>
                  <input type="number" name="makanan_porsi" value={values.makanan_porsi} placeholder="Jumlah (kg/bulan)" onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              {/* Tombol dengan gradasi */}
              <button type="submit" disabled={isLoading} className="w-full font-bold py-3 px-6 rounded-md transition-all duration-300 text-white text-lg disabled:opacity-50 bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600">
                {isLoading ? 'Menghitung...' : 'Hitung Sekarang'}
              </button>
              {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
            </form>
          </div>
        ) : (
          <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl">
            <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl text-center">
              <h2 className="text-2xl font-bold mb-4">Hasil Jejak Karbonmu</h2>
              <p className="text-5xl font-bold text-green-400 mb-4">{totalEmissions.toFixed(2)} <span className="text-xl">kg CO₂e / bulan</span></p>
              {breakdown && (
                  <div className="text-left text-gray-300 w-fit mx-auto mb-6 space-y-2">
                      <p>⚡️ Listrik: <strong>{breakdown.listrik.toFixed(2)}</strong> kg CO₂e</p>
                      <p>🚗 Transportasi: <strong>{breakdown.transportasi.toFixed(2)}</strong> kg CO₂e</p>
                      <p>🍔 Konsumsi: <strong>{breakdown.konsumsi.toFixed(2)}</strong> kg CO₂e</p>
                  </div>
              )}
              <p className="text-gray-400 mb-6">Ini adalah estimasi berdasarkan data yang kamu berikan. Mulailah kurangi dari sekarang!</p>
              <button onClick={resetCalculator} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Hitung Ulang</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}