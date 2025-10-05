import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

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

    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (quizError || !quiz) {
      throw new Error('Quiz not found');
    }

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, question_text, option_a, option_b, option_c, option_d, order_index')
      .eq('quiz_id', quiz.id)
      .order('order_index', { ascending: true });

    if (questionsError) {
      throw questionsError;
    }

    const formattedQuestions = questions.map((q) => ({
      id: q.id,
      questionText: q.question_text,
      options: {
        A: q.option_a,
        B: q.option_b,
        C: q.option_c,
        D: q.option_d,
      },
      orderIndex: q.order_index,
    }));

    const response = {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      timeLimit: quiz.time_limit,
      questions: formattedQuestions,
    };

    return new Response(JSON.stringify(response), {
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