'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface EcoPoint {
  id: number;
  name: string;
  category: string;
  address: string;
  position: [number, number];
  distance?: number;
}

export default function MapPage() {
  const [ecoPoints, setEcoPoints] = useState<EcoPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    radius: '10',
  });

  const fetchEcoPoints = useCallback(async () => {
    if (!userLocation) return;

    setLoading(true);
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    
    params.append('lat', userLocation[0].toString());
    params.append('lon', userLocation[1].toString());
    params.append('radius', filters.radius);
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/ecopoints/?${params.toString()}`);
      if (!response.ok) throw new Error("Gagal mengambil data dari server");
      const data = await response.json();
      setEcoPoints(data);
    } catch (error) {
      console.error("Gagal mengambil data titik lestari:", error);
      setEcoPoints([]); 
    } finally {
      setLoading(false);
    }
  }, [userLocation, filters]);

  useEffect(() => {
    fetchEcoPoints();
  }, [fetchEcoPoints]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      () => {
        console.error("Gagal mendapatkan lokasi. Pencarian berbasis lokasi dinonaktifkan.");
        setUserLocation([-6.26, 106.8]); 
        setLoading(false); 
      }
    );
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEcoPoints();
  };

  const Map = useMemo(
    () => dynamic(() => import('@/components/Map'), {
        loading: () => <p className="text-center text-gray-500">Memuat Peta...</p>,
        ssr: false,
    }),
    [],
  );

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">Peta Aksi Lokal</h1>
        <TypeAnimation sequence={['Temukan lokasi ramah lingkungan di sekitarmu.', 2000]} wrapper="p" speed={50} className="text-center text-gray-400 mb-12 text-lg" repeat={0} />

        {/* Form Filter dengan border gradasi */}
        <div className="p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl mb-8">
            <form onSubmit={handleSearch} className="p-4 bg-gray-900/80 backdrop-blur-lg rounded-2xl flex flex-col md:flex-row gap-4 items-center">
                <input type="text" name="search" value={filters.search} onChange={handleFilterChange} placeholder="Cari nama atau alamat..." className="w-full md:w-1/3 bg-gray-800/50 border border-gray-700 rounded-md p-2" />
                <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full md:w-1/4 bg-gray-800/50 border border-gray-700 rounded-md p-2">
                    <option value="">Semua Kategori</option>
                    <option value="Bank Sampah">Bank Sampah</option>
                    <option value="Thrift Store / Pakaian Bekas">Thrift Store / Pakaian Bekas</option>
                    <option value="Bulk Store / Zero Waste">Bulk Store / Zero Waste</option>
                    <option value="Komunitas / Edukasi">Komunitas / Edukasi</option>
                </select>
                <div className="w-full md:w-1/4 flex items-center gap-2">
                    <label htmlFor="radius">Radius:</label>
                    <input type="range" id="radius" name="radius" min="1" max="50" value={filters.radius} onChange={handleFilterChange} className="w-full" disabled={!userLocation} />
                    <span>{filters.radius} km</span>
                </div>
                {/* Tombol dengan gradasi */}
                <button type="submit" className="w-full md:w-auto font-bold py-2 px-4 rounded-md transition-all duration-300 text-white bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600">
                  Cari
                </button>
            </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hasil Pencarian dengan border gradasi */}
          <div className="lg:col-span-1 p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl h-[600px]">
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-6 h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">Hasil Pencarian</h2>
                {loading ? <p>Mencari lokasi...</p> : (
                  <div className="space-y-4">
                    {ecoPoints.length > 0 ? ecoPoints.map((point) => (
                      <div key={point.id} className="border-b border-gray-700 pb-4 last:border-b-0">
                        <h3 className="text-lg font-bold text-green-400">{point.name}</h3>
                        <p className="text-sm text-gray-300">{point.category}</p>
                        {point.distance !== undefined && <p className="text-xs text-cyan-400">~{point.distance.toFixed(2)} km dari Anda</p>}
                        <p className="text-xs text-gray-500 mt-1">{point.address}</p>
                      </div>
                    )) : <p>Tidak ada lokasi yang ditemukan. Coba perbesar radius pencarian.</p>}
                  </div>
                )}
            </div>
          </div>
          {/* Peta dengan border gradasi */}
          <div className="lg:col-span-2 p-[1px] bg-gradient-to-r from-green-400/30 to-cyan-400/30 rounded-2xl h-[600px]">
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl h-full overflow-hidden">
                <Map points={ecoPoints} userLocation={userLocation} radiusInKm={parseInt(filters.radius)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}