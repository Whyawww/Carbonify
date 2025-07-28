import { useEffect, useState } from 'react';
import { weeklyChallenges } from '@/lib/gamificationData';

// Data statis untuk Tantangan Mingguan
const weeklyChallengeMap = new Map(weeklyChallenges.map(c => [c.id, c.description]));

const ActivityFeed = ({ completedChallenges }: { completedChallenges: string[] }) => {
    const [actionDetails, setActionDetails] = useState<Map<string, string>>(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchActionDetails = async () => {
            // Pisahkan antara ID Aksi Nyata (angka) dan ID lainnya
            const numericActionIds = completedChallenges
                .map(id => parseInt(id, 10))
                .filter(id => !isNaN(id));

            if (numericActionIds.length > 0) {
                try {
                    // Ambil detail semua Aksi Nyata dalam satu panggilan
                    const response = await fetch(`http://127.0.0.1:8000/api/v1/actions/?ids=${numericActionIds.join(',')}`);
                    const actions = await response.json();
                    
                    const newDetails = new Map();
                    actions.forEach((action: { id: number; title: string }) => {
                        newDetails.set(String(action.id), action.title);
                    });
                    setActionDetails(newDetails);

                } catch (error) {
                    console.error("Gagal mengambil detail aksi:", error);
                }
            }
            setLoading(false);
        };

        fetchActionDetails();
    }, [completedChallenges]);

    const getChallengeName = (id: string) => {
        // Prioritaskan nama dari Aksi Nyata
        if (actionDetails.has(id)) {
            return actionDetails.get(id);
        }
        // Jika tidak ada, cari di Tantangan Mingguan
        if (weeklyChallengeMap.has(id)) {
            return weeklyChallengeMap.get(id);
        }
        // Jika tidak ditemukan, tampilkan ID-nya
        return `Aksi #${id}`;
    };

    if (loading) {
        return <div className="text-center py-4">Memuat riwayat...</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <ul className="space-y-3">
                {completedChallenges.length > 0 ? (
                    completedChallenges.slice(0, 5).map(challengeId => (
                        <li key={challengeId} className="p-3 bg-gray-50 rounded-md">
                            <p className="font-medium text-gray-700">
                                Menyelesaikan: <span className="font-normal text-green-600">{getChallengeName(challengeId)}</span>
                            </p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-center py-4">Belum ada aksi yang diselesaikan.</p>
                )}
            </ul>
        </div>
    );
};

export default ActivityFeed;