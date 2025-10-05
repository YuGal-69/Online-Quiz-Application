import { BookOpen } from 'lucide-react';

interface StartPageProps {
  title: string;
  description: string;
  totalQuestions: number;
  timeLimit: number;
  onStart: () => void;
}

export default function StartPage({
  title,
  description,
  totalQuestions,
  timeLimit,
  onStart
}: StartPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          {title}
        </h1>

        <p className="text-lg text-gray-600 text-center mb-8">
          {description}
        </p>

        <div className="bg-slate-50 rounded-xl p-6 mb-8 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Total Questions:</span>
            <span className="text-gray-900 font-semibold">{totalQuestions}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">Time Limit:</span>
            <span className="text-gray-900 font-semibold">
              {Math.floor(timeLimit / 60)} minutes
            </span>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 text-lg shadow-lg hover:shadow-xl"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
