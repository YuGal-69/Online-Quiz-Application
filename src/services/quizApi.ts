import { QuizData, QuizAnswer, QuizResult } from '../types/quiz';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const fetchQuiz = async (): Promise<QuizData> => {
  const apiUrl = `${SUPABASE_URL}/functions/v1/get-quiz`;

  const response = await fetch(apiUrl, {
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch quiz');
  }

  return await response.json();
};

export const submitQuiz = async (
  quizId: string,
  answers: QuizAnswer[],
  timeTaken: number
): Promise<QuizResult> => {
  const apiUrl = `${SUPABASE_URL}/functions/v1/submit-quiz`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quizId,
      answers,
      timeTaken,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit quiz');
  }

  return await response.json();
};
