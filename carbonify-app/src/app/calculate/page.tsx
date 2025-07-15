'use client';

import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

type CalculatorState = {
  listrik: number;
  transportasi: number;
  konsumsi: number;
};

export default function CalculatorPage() {
  const [values, setValues] = useState<CalculatorState>({
    listrik: 0,
    transportasi: 0,
    konsumsi: 0,
  });

  const [totalEmissions, setTotalEmissions] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: Number(value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const listrikCo2 = values.listrik * 0.85;
    const transportasiCo2 = values.transportasi * 0.21;
    const konsumsiCo2 = values.konsumsi * 2.5;

    const total = listrikCo2 + transportasiCo2 + konsumsiCo2;
    setTotalEmissions(total);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-2">
          Kalkulator Jejak Karbon
        </h1>

        <TypeAnimation
          sequence={['Cari tahu estimasi jejak karbon bulananmu.', 2000]}
          wrapper="p"
          speed={50}
          className="text-center text-gray-400 mb-10 text-lg"
          repeat={0}
        />

        {!totalEmissions ? (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/30 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-lg space-y-6 transition-all duration-300 hover:border-blue-500/50 hover:scale-102"
          >
            {/* Pertanyaan 1: Listrik */}
            <div>
              <label
                htmlFor="listrik"
                className="block text-lg font-medium mb-2"
              >
                Berapa konsumsi listrik bulananmu? (dalam kWh)
              </label>
              <input
                type="number"
                name="listrik"
                id="listrik"
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Contoh: 100"
                required
              />
            </div>

            {/* Pertanyaan 2: Transportasi */}
            <div>
              <label
                htmlFor="transportasi"
                className="block text-lg font-medium mb-2"
              >
                Berapa total jarak tempuhmu per bulan? (dalam km)
              </label>
              <input
                type="number"
                name="transportasi"
                id="transportasi"
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Contoh: 300"
                required
              />
            </div>

            {/* Pertanyaan 3: Konsumsi */}
            <div>
              <label
                htmlFor="konsumsi"
                className="block text-lg font-medium mb-2"
              >
                Berapa kali kamu mengonsumsi daging merah dalam sebulan?
              </label>
              <input
                type="number"
                name="konsumsi"
                id="konsumsi"
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-md p-3 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Contoh: 15"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-700 text-white hover:text-black font-bold py-3 px-6 rounded-md transition-colors text-lg hover:scale-105"
            >
              Hitung Sekarang
            </button>
          </form>
        ) : (
          <div className="bg-gray-900/30 backdrop-blur-lg border border-gray-700 p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:border-blue-500/50">
            <h2 className="text-2xl font-bold mb-4">Hasil Jejak Karbonmu</h2>
            <p className="text-5xl font-bold text-green-400 mb-4">
              {totalEmissions.toFixed(2)}{' '}
              <span className="text-xl">kg CO₂e / bulan</span>
            </p>
            <p className="text-gray-400 mb-6">
              Ini adalah estimasi berdasarkan data yang kamu berikan. Mulailah
              kurangi dari sekarang!
            </p>
            <button
              onClick={() => setTotalEmissions(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
            >
              Hitung Ulang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
