// src/app/profile/ActivityChart.tsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  breakdown: { [key: string]: number };
}

const ActivityChart = ({ breakdown }: Props) => {
  const data = {
    labels: Object.keys(breakdown),
    datasets: [
      {
        label: 'Jumlah Aksi',
        data: Object.values(breakdown),
        backgroundColor: 'rgba(52, 211, 153, 0.6)', // warna hijau
        borderColor: 'rgba(52, 211, 153, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Jumlah Aksi per Kategori' },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ActivityChart;