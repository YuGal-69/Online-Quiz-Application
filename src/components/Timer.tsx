import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TimerProps {
  timeLimit: number;
  onTimeUp: () => void;
}

export default function Timer({ timeLimit, onTimeUp }: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeUp]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const percentage = (timeRemaining / timeLimit) * 100;

  const getColorClass = () => {
    if (percentage > 50) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage > 20) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 ${getColorClass()}`}>
      <Clock className="w-5 h-5" />
      <span className="font-bold text-lg">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}
