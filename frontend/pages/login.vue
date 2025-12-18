<template>
  <div style="padding: 40px">
    <h1>Login</h1>

    <input
      v-model="email"
      type="email"
      placeholder="Email"
    />

    <input
      v-model="password"
      type="password"
      placeholder="Password"
    />

    <button @click="login">
      Login
    </button>

    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../utils/supabase'

const email = ref('')
const password = ref('')
const message = ref('')

const login = async () => {
  message.value = 'Logging in...'

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value.trim(),
    password: password.value.trim()
  })

  if (error) {
    message.value = error.message
  } else {
    message.value = 'Login successful ✅'
    // optional: redirect
    navigateTo('/courses')
  }
}
</script>
