export interface QuizQuestion {
  id: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  orderIndex: number;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: QuizQuestion[];
}

export interface QuizAnswer {
  questionId: string;
  selectedOption: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  timeTaken: number;
  details: {
    questionId: string;
    questionText: string;
    selectedOption: string;
    correctOption: string;
    isCorrect: boolean;
  }[];
}
