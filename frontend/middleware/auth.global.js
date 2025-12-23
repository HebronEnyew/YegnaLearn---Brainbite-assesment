export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

   const publicRoutes = ['/', '/login', '/signup']

  if (publicRoutes.includes(to.path)) {
    return
  }

  if (!user.value) {
    return navigateTo('/login')
  }
})