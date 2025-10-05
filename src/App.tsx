import { useState, useEffect } from 'react';
import StartPage from './components/StartPage';
import QuestionCard from './components/QuestionCard';
import ResultsPage from './components/ResultsPage';
import Timer from './components/Timer';
import { QuizData, QuizAnswer, QuizResult } from './types/quiz';
import { fetchQuiz, submitQuiz } from './services/quizApi';

type AppState = 'loading' | 'start' | 'quiz' | 'results';

function App() {
  const [appState, setAppState] = useState<AppState>('loading');
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, string>>(new Map());
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      const data = await fetchQuiz();
      setQuizData(data);
      setAppState('start');
    } catch (error) {
      console.error('Failed to load quiz:', error);
    }
  };

  const handleStartQuiz = () => {
    setAppState('quiz');
    setStartTime(Date.now());
  };

  const handleSelectOption = (option: string) => {
    if (!quizData) return;

    const questionId = quizData.questions[currentQuestionIndex].id;
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, option);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (quizData && currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quizData) return;

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const answersArray: QuizAnswer[] = Array.from(answers.entries()).map(
      ([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      })
    );

    try {
      const result = await submitQuiz(quizData.id, answersArray, timeTaken);
      setQuizResult(result);
      setAppState('results');
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers(new Map());
    setQuizResult(null);
    setAppState('start');
  };

  if (appState === 'loading' || !quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (appState === 'start') {
    return (
      <StartPage
        title={quizData.title}
        description={quizData.description}
        totalQuestions={quizData.questions.length}
        timeLimit={quizData.timeLimit}
        onStart={handleStartQuiz}
      />
    );
  }

  if (appState === 'results' && quizResult) {
    return <ResultsPage result={quizResult} onRestart={handleRestart} />;
  }

  const currentQuestion = quizData.questions[currentQuestionIndex];
  const selectedOption = answers.get(currentQuestion.id) || null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{quizData.title}</h1>
          <Timer timeLimit={quizData.timeLimit} onTimeUp={handleTimeUp} />
        </div>

        <QuestionCard
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={quizData.questions.length}
          selectedOption={selectedOption}
          onSelectOption={handleSelectOption}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
