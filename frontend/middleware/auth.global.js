import { supabase } from '~/utils/supabase'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip login/signup pages
  if (to.path === '/login' || to.path === '/signup') return

  // Get the current Supabase session
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return navigateTo('/login')
  }
})
