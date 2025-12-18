<template>
  <div style="padding: 40px">
    <h1>Sign Up</h1>

    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <input v-model="fullName" placeholder="Full name" />

    <button @click="signup">Sign Up</button>

    <p>{{ message }}</p>

    <button v-if="!error" @click="navigateTo('/login')">Go to Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../utils/supabase'

const email = ref('')
const password = ref('')
const fullName = ref('')
const message = ref('')

const signup = async () => {
  message.value = 'Creating account...'

  const { data, error } = await supabase.auth.signUp({
    email: email.value.trim(),
    password: password.value.trim()
  })

  if (error) {
    message.value = error.message
    return
  }

  // create profile row
//   const { error: profileError } = await supabase
//     .from('users')
//     .insert({
//       id: data.user.id,
//       email: data.user.email,
//       full_name: fullName.value
//     })

  if (error) {
    message.value = error.message
  } else {
    message.value = 'Account created ✅ You can now login'
  }
}
</script>
