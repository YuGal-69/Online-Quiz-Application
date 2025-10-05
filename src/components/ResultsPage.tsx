import { CheckCircle, XCircle, Trophy, Clock, RotateCcw } from 'lucide-react';
import { QuizResult } from '../types/quiz';

interface ResultsPageProps {
  result: QuizResult;
  onRestart: () => void;
}

export default function ResultsPage({ result, onRestart }: ResultsPageProps) {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const minutes = Math.floor(result.timeTaken / 60);
  const seconds = result.timeTaken % 60;

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 60) return 'Good job!';
    if (percentage >= 40) return 'Not bad!';
    return 'Keep practicing!';
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-100 p-4 rounded-full">
              <Trophy className="w-16 h-16 text-yellow-600" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
            Quiz Complete!
          </h1>

          <p className={`text-2xl font-semibold text-center mb-8 ${getScoreColor()}`}>
            {getScoreMessage()}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {result.score}/{result.totalQuestions}
              </div>
              <div className="text-gray-600 font-medium">Correct Answers</div>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {percentage}%
              </div>
              <div className="text-gray-600 font-medium">Score</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
                <div className="text-4xl font-bold text-purple-600">
                  {minutes}:{String(seconds).padStart(2, '0')}
                </div>
              </div>
              <div className="text-gray-600 font-medium">Time Taken</div>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5" />
            Take Quiz Again
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Answer Review
          </h2>

          <div className="space-y-4">
            {result.details.map((detail, index) => (
              <div
                key={detail.questionId}
                className={`border-2 rounded-xl p-6 ${
                  detail.isCorrect
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {detail.isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {index + 1}. {detail.questionText}
                    </h3>

                    <div className="space-y-2">
                      {!detail.isCorrect && detail.selectedOption && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Your answer:</span>
                          <span className="font-medium text-red-600">
                            {detail.selectedOption}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Correct answer:</span>
                        <span className="font-medium text-green-600">
                          {detail.correctOption}
                        </span>
                      </div>

                      {!detail.selectedOption && (
                        <div className="text-sm text-gray-500 italic">
                          No answer selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
