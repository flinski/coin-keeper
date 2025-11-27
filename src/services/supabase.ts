import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wxbbhywklttxzfornbyw.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4YmJoeXdrbHR0eHpmb3JuYnl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTc0NTEsImV4cCI6MjA3OTczMzQ1MX0.bAx7gHbKg-YN63Y495R1DzF4GioGvSPLru5h2pDcxLA'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
