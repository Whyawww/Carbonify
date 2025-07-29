// src/app/profile/BadgesGallery.tsx
import { FaTrophy, FaSeedling, FaLock } from 'react-icons/fa';

// Definisikan semua lencana yang mungkin ada di aplikasi Anda
const ALL_BADGES = {
  aktivis_pemula: { icon: <FaSeedling />, name: "Aktivis Pemula", desc: "Mencapai 100 poin pertama!" },
  master_aksi: { icon: <FaTrophy />, name: "Master Aksi", desc: "Luar biasa! Mencapai 500 poin." },
  // Tambahkan lencana lain di sini...
};

interface Props {
  earnedBadges: string[];
}

const BadgesGallery = ({ earnedBadges }: Props) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {Object.entries(ALL_BADGES).map(([key, badge]) => {
        const isEarned = earnedBadges.includes(key);
        return (
          <div key={key} title={badge.desc} className={`p-4 rounded-lg flex flex-col items-center justify-center text-center transition-all duration-300 ${isEarned ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-400'}`}>
            <div className={`text-4xl ${isEarned ? '' : 'opacity-50'}`}>
              {isEarned ? badge.icon : <FaLock />}
            </div>
            <p className="mt-2 font-semibold text-sm">{badge.name}</p>
          </div>
        );
      })}
    </div>
  </div>
);

export default BadgesGallery;