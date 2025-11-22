import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ============================================
// SUPABASE CLIENT CONFIGURATION
// ============================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ============================================
// CLIENT FOR FRONTEND (uses anon key)
// Respects Row Level Security
// ============================================
function createBrowserClient(): SupabaseClient {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Check your .env.local file.'
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}

export const supabase = createBrowserClient();

// ============================================
// CLIENT FOR BACKEND/API ROUTES (uses service role)
// Bypasses Row Level Security - use carefully!
// ============================================
export function createServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// ============================================
// TYPESCRIPT TYPES FOR DATABASE
// ============================================
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