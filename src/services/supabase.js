import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dhzumtcqlyktwmpbioub.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoenVtdGNxbHlrdHdtcGJpb3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2OTU2MTYsImV4cCI6MjAxMzI3MTYxNn0.UJqN3Scj87P3jpP5O89eMkjzJ5_0jF7KBndqJSfubKE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
