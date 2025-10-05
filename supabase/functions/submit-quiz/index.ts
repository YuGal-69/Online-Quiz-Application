import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface QuizAnswer {
  questionId: string;
  selectedOption: string;
}

interface SubmitRequest {
  quizId: string;
  answers: QuizAnswer[];
  timeTaken: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { quizId, answers, timeTaken }: SubmitRequest = await req.json();

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, question_text, correct_option')
      .eq('quiz_id', quizId);

    if (questionsError || !questions) {
      throw new Error('Failed to fetch questions');
    }

    let score = 0;
    const details = questions.map((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.id);
      const selectedOption = userAnswer?.selectedOption || '';
      const isCorrect = selectedOption === question.correct_option;

      if (isCorrect) {
        score++;
      }

      return {
        questionId: question.id,
        questionText: question.question_text,
        selectedOption,
        correctOption: question.correct_option,
        isCorrect,
      };
    });

    const { error: insertError } = await supabase
      .from('quiz_attempts')
      .insert({
        quiz_id: quizId,
        score,
        total_questions: questions.length,
        time_taken: timeTaken,
        answers: answers,
      });

    if (insertError) {
      console.error('Failed to save quiz attempt:', insertError);
    }

    const result = {
      score,
      totalQuestions: questions.length,
      timeTaken,
      details,
    };

    return new Response(JSON.stringify(result), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      },
    );
  }
});