import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://njnsqdcrdqjjmqrpexwi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qbnNxZGNyZHFqam1xcnBleHdpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MTUyMjEsImV4cCI6MjA4MTQ5MTIyMX0.--lZBeJzEH3SqB06ZRmWnV5YAX5VXMOUlPRc7aSo1v0'
)
