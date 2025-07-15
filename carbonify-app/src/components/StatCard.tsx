'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface StatCardProps {
  prefix?: string;
  end: number;
  decimals?: number;
  suffix: string;
  title: string;
}

const StatCard = ({ prefix, end, decimals, suffix, title }: StatCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className="bg-gray-900/30 backdrop-blur-lg border border-gray-700 p-6 rounded-2xl"
    >
      <p className="text-4xl font-bold text-cyan-400 mb-2">
        {prefix}
        {inView ? (
          <CountUp end={end} duration={2.5} decimals={decimals || 0} />
        ) : (
          '0'
        )}
        {suffix}
      </p>
      <p className="text-gray-300">{title}</p>
    </div>
  );
};

export default StatCard;
