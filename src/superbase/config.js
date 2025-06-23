import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ycyyhjqlbfdmdldgzkkb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljeXloanFsYmZkbWRsZGd6a2tiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MTA2ODUsImV4cCI6MjA2NTk4NjY4NX0.BDyUToZ-IjBlfFxyqQveA3_35pVfsSbxMBLow96HcNM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

