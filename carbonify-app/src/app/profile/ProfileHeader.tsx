import Image from 'next/image';
import { FaMedal, FaStar } from 'react-icons/fa';

interface Props {
  name: string;
  avatarUrl: string;
  score: number;
  rank: number;
}

const ProfileHeader = ({ name, avatarUrl, score, rank }: Props) => (
  <div className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text border-2 border-green-500 text-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6">
    <Image
      src={avatarUrl || '/default-avatar.png'}
      alt="User Avatar"
      width={100}
      height={100}
      className="rounded-full border-4 border-green-400"
    />
    <div className="text-center sm:text-left text-white">
      <h1 className="text-3xl font-bold">{name}</h1>
      <div className="flex items-center justify-center sm:justify-start gap-6 mt-2">
        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold">{score} Poin Lestari</span>
        </div>
        <div className="flex items-center gap-2">
          <FaMedal className="text-blue-500" />
          <span className="font-semibold">Peringkat #{rank}</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
