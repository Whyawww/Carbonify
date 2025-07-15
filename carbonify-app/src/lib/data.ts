// Tipe data untuk Aksi Nyata
interface Action {
  id: number;
  emoji: string;
  title: string;
  description: string;
}

// Tipe data untuk Peta Lokal
interface EcoPoint {
  id: number;
  name: string;
  category: string;
  address: string;
  position: [number, number];
}

// Data untuk halaman Aksi Nyata
export const actionsData: Action[] = [
  {
    id: 1,
    emoji: '♻️',
    title: 'Pilahlah Sampah',
    description: 'Pisahkan sampah organik, anorganik, dan B3 untuk memudahkan proses daur ulang dan mengurangi volume sampah di TPA.',
  },
  {
    id: 2,
    emoji: '💧',
    title: 'Gunakan Botol Minum Isi Ulang',
    description: 'Hindari membeli air minum kemasan sekali pakai. Satu botol plastik membutuhkan ratusan tahun untuk terurai.',
  },
  {
    id: 3,
    emoji: '💡',
    title: 'Matikan Listrik Jika Tidak Digunakan',
    description: 'Cabut charger dan matikan lampu atau peralatan elektronik lainnya saat tidak dipakai untuk menghemat energi.',
  },
  {
    id: 4,
    emoji: '🛍️',
    title: 'Bawa Tas Belanja Sendiri',
    description: 'Tolak kantong plastik sekali pakai saat berbelanja. Gunakan tas kain yang bisa dipakai berulang kali.',
  },
  {
    id: 5,
    emoji: '🚲',
    title: 'Gunakan Transportasi Publik atau Bersepeda',
    description: 'Kurangi penggunaan kendaraan pribadi untuk menekan emisi gas rumah kaca dari sektor transportasi.',
  },
  {
    id: 6,
    emoji: '🥩',
    title: 'Kurangi Konsumsi Daging Merah',
    description: 'Industri peternakan adalah salah satu penyumbang emisi gas metana terbesar. Coba ganti dengan protein nabati.',
  },
];

// Data untuk halaman Peta Lokal
export const ecoPoints: EcoPoint[] = [
  {
    id: 1,
    name: 'Bank Sampah Melati Bersih',
    category: 'Bank Sampah',
    address: 'Jl. Mawar No. 12, Jakarta Selatan',
    position: [-6.28, 106.80],
  },
  {
    id: 2,
    name: 'Naked Inc. Bulk Store',
    category: 'Bulk Store / Zero Waste',
    address: 'Jl. Kemang Raya No. 3, Jakarta Selatan',
    position: [-6.26, 106.81],
  },
  {
    id: 3,
    name: 'Setali Indonesia',
    category: 'Thrift Store / Pakaian Bekas',
    address: 'Jl. Radio Dalam No. 14, Jakarta Selatan',
    position: [-6.25, 106.78],
  },
  {
    id: 4,
    name: 'Kebun Kumara',
    category: 'Komunitas / Edukasi',
    address: 'Jl. Cilandak KKO No. 1, Jakarta Selatan',
    position: [-6.30, 106.81],
  },
];