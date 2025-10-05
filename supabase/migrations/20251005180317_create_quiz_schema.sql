

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  time_limit integer DEFAULT 300,
  created_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  question_text text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_option text NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE NOT NULL,
  score integer NOT NULL DEFAULT 0,
  total_questions integer NOT NULL,
  time_taken integer DEFAULT 0,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quizzes
CREATE POLICY "Anyone can read quizzes"
  ON quizzes FOR SELECT
  USING (true);

-- RLS Policies for questions
CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  USING (true);

-- RLS Policies for quiz_attempts
CREATE POLICY "Anyone can create quiz attempts"
  ON quiz_attempts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read quiz attempts"
  ON quiz_attempts FOR SELECT
  USING (true);

-- Insert sample quiz
INSERT INTO quizzes (title, description, time_limit)
VALUES (
  'General Knowledge Quiz',
  'Test your knowledge with this fun general knowledge quiz!',
  300
);

-- Insert sample questions
INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT 
  q.id,
  'What is the capital of France?',
  'London',
  'Berlin',
  'Paris',
  'Madrid',
  'C',
  1
FROM quizzes q
WHERE q.title = 'General Knowledge Quiz';

INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT 
  q.id,
  'Which planet is known as the Red Planet?',
  'Venus',
  'Mars',
  'Jupiter',
  'Saturn',
  'B',
  2
FROM quizzes q
WHERE q.title = 'General Knowledge Quiz';

INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT 
  q.id,
  'Who wrote "Romeo and Juliet"?',
  'Charles Dickens',
  'Mark Twain',
  'William Shakespeare',
  'Jane Austen',
  'C',
  3
FROM quizzes q
WHERE q.title = 'General Knowledge Quiz';

INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT 
  q.id,
  'What is the largest ocean on Earth?',
  'Atlantic Ocean',
  'Indian Ocean',
  'Arctic Ocean',
  'Pacific Ocean',
  'D',
  4
FROM quizzes q
WHERE q.title = 'General Knowledge Quiz';

INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_option, order_index)
SELECT 
  q.id,
  'In which year did World War II end?',
  '1943',
  '1944',
  '1945',
  '1946',
  'C',
  5
FROM quizzes q
WHERE q.title = 'General Knowledge Quiz';