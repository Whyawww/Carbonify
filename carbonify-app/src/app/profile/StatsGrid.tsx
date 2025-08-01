import { FaCalendarAlt, FaFire, FaHiking } from 'react-icons/fa';

interface Props {
  totalActions: number;
  joinDate: string;
  activityBreakdown: { [key: string]: number };
}

const StatsCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) => (
  <div className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text border-2 border-green-500 rounded-lg shadow p-4 flex items-center gap-4">
    <div className="bg-white text-green-600 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-white">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  </div>
);

const StatsGrid = ({ totalActions, joinDate, activityBreakdown }: Props) => {
  const formattedJoinDate = new Date(joinDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const favoriteCategory = Object.keys(activityBreakdown).reduce(
    (a, b) => (activityBreakdown[a] > activityBreakdown[b] ? a : b),
    'Tidak ada',
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatsCard
        icon={<FaHiking size={20} />}
        title="Total Aksi Selesai"
        value={`${totalActions} Aksi`}
      />
      <StatsCard
        icon={<FaCalendarAlt size={20} />}
        title="Bergabung Sejak"
        value={formattedJoinDate}
      />
      <StatsCard
        icon={<FaFire size={20} />}
        title="Kategori Favorit"
        value={favoriteCategory}
      />
    </div>
  );
};

export default StatsGrid;
