# Online Quiz Application

A modern online quiz app built with React, TypeScript, Vite, Tailwind CSS, and Supabase. Users can take timed quizzes, review answers, and see results instantly.

## Repository

[https://github.com/YuGal-69/Online-Quiz-Application.git]

## 1. Description

This project is a web-based quiz application that allows users to take quizzes, view results, and review answers. The backend uses Supabase Edge Functions for quiz data and submissions.

## 2. Setup and Run Locally

### Prerequisites

- Node.js v18+
- npm or yarn
- Supabase account

### Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YuGal-69/Online-Quiz-Application.git

   cd Online-Quiz-Application
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Set up Supabase backend:**
   - Run the migration SQL in `supabase/migrations/20251005180317_create_quiz_schema.sql` on your Supabase database.
   - Deploy Edge Functions in `supabase/functions/`.

5. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

## 3. Run Test Cases

```sh
npm run test
# or
yarn test
```
Test cases are located in the `src/__tests__/` directory and use Jest.

## 4. Assumptions & Design Choices

- Quiz data is stored and fetched from Supabase Edge Functions.
- The app is built for modern browsers and is mobile responsive.
- TypeScript is used for type safety.
- Tailwind CSS is used for rapid UI development.
- The quiz auto-submits when the timer expires.

---

**MIT License**