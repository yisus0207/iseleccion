import { createClient } from '@supabase/supabase-js';

let supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Si faltan variables de entorno, usamos credenciales ficticias sintácticamente válidas 
// para evitar que el cliente de Supabase lance una excepción fatal y rompa la carga de la web.
const hasCredentials = supabaseUrl && supabaseAnonKey;

if (!hasCredentials) {
  console.warn(
    '⚠️ Faltan las credenciales de Supabase en las variables de entorno (.env).\n' +
    'Por favor, crea tu archivo .env basado en .env.example para conectar la base de datos.'
  );
  
  // URL de prueba sintácticamente válida
  supabaseUrl = supabaseUrl || 'https://placeholder-project.supabase.co';
  // JWT de prueba sintácticamente válido para evitar error de firma
  supabaseAnonKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIn0.placeholder';
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

