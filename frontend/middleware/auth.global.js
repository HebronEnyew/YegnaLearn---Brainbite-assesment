export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  // If the user is NOT logged in and tries to go to the dashboard or courses
  // Redirect them to the login page
  if (!user.value && (to.path.startsWith('/dashboard') || to.path.startsWith('/courses'))) {
    return navigateTo('/login')
  }
})