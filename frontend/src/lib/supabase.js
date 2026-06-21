import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)

// Get hidden email using matric number
export async function getEmailByMatric(matricNumber) {
  const { data, error } = await supabase
    .from('profiles')
    .select('email')
    .eq('matric_number', matricNumber)
    .single()

  return {
    email: data?.email || null,
    error
  }
}

// Turn matric number to mail
export function matricToEmail(matricNumber) {
  return matricNumber
    .trim()
    .toLowerCase()
    .replace(/\//g,'-')
  +'@campusmind.ai'
}