

export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  runtimeConfig: {
    public: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY
    }
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
})


