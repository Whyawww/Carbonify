import { useEffect, useState } from 'react';
import { weeklyChallenges } from '@/lib/gamificationData';

const weeklyChallengeMap = new Map(
  weeklyChallenges.map((c) => [c.id, c.description]),
);

const ActivityFeed = ({
  completedChallenges,
}: {
  completedChallenges: string[];
}) => {
  const [actionDetails, setActionDetails] = useState<Map<string, string>>(
    new Map(),
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActionDetails = async () => {
      const numericActionIds = completedChallenges
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id));

      if (numericActionIds.length > 0) {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/v1/actions/?ids=${numericActionIds.join(',')}`,
          );
          const actions = await response.json();

          const newDetails = new Map();
          actions.forEach((action: { id: number; title: string }) => {
            newDetails.set(String(action.id), action.title);
          });
          setActionDetails(newDetails);
        } catch (error) {
          console.error('Gagal mengambil detail aksi:', error);
        }
      }
      setLoading(false);
    };

    fetchActionDetails();
  }, [completedChallenges]);

  const getChallengeName = (id: string) => {
    if (actionDetails.has(id)) {
      return actionDetails.get(id);
    }
    if (weeklyChallengeMap.has(id)) {
      return weeklyChallengeMap.get(id);
    }
    return `Aksi #${id}`;
  };

  if (loading) {
    return <div className="text-center py-4">Memuat riwayat...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent border-2 border-green-500 rounded-lg shadow p-4">
      <ul className="space-y-3">
        {completedChallenges.length > 0 ? (
          completedChallenges.slice(0, 5).map((challengeId) => (
            <li
              key={challengeId}
              className="p-3 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text-50 rounded-md"
            >
              <p className="font-medium text-white">
                Menyelesaikan:{' '}
                <span className="font-normal text-white">
                  {getChallengeName(challengeId)}
                </span>
              </p>
            </li>
          ))
        ) : (
          <p className="text-white text-center py-4">
            Belum ada aksi yang diselesaikan.
          </p>
        )}
      </ul>
    </div>
  );
};

export default ActivityFeed;
