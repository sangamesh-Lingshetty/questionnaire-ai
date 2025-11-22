import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseURL || !supabaseAnonKey) {
  throw new Error(
    "Missing supabase environment variable. check your .env.local file."
  );
}

// client or frontend uses the anon key
export const supabase = createClient(supabaseURL, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

// CLIENT FOR BACKEND/API ROUTES (uses service role)

export function createServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseURL, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// TYPESCRIPT TYPES FOR DATABASE

export interface Document {
  id: string;
  user_id: string;
  name: string;
  file_type: 'pdf' | 'docx' | 'txt';
  content: string;
  char_count: number;
  created_at: string;
  updated_at: string;
}


export interface Questionnaire {
  id: string;
  user_id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total_questions: number;
  completed_questions: number;
  created_at: string;
  updated_at: string;
}

export interface Question {
  id: string;
  questionnaire_id: string;
  row_number: number;
  question_text: string;
  generated_answer: string | null;
  edited_answer: string | null;
  confidence: number;
  status: 'pending' | 'generating' | 'generated' | 'edited' | 'failed';
  created_at: string;
  updated_at: string;
}

// ============================================
// HELPER TYPE FOR INSERT OPERATIONS
// (excludes auto-generated fields)
// ============================================
export type DocumentInsert = Omit<Document, 'id' | 'created_at' | 'updated_at'>;
export type QuestionnaireInsert = Omit<Questionnaire, 'id' | 'created_at' | 'updated_at'>;
export type QuestionInsert = Omit<Question, 'id' | 'created_at' | 'updated_at'>;
