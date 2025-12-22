import { reactive } from 'vue'
import { useSupabasesupabase } from '~/utils/supabase'

export const userState = reactive({ user: null })
const supabase = useSupabase()

// Initialize user on load                          
supabase.auth.onAuthStateChange((event, session) => {
  userState.user = session?.user ?? null
})
