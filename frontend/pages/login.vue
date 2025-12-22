<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">Welcome Back</h1>
      <p class="login-subtitle">Sign in to access your courses</p>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="login-input"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="login-input"
      />

      <button @click="login" class="login-btn">
        Login
      </button>

      <p class="login-message">{{ message }}</p>

      <p class="login-footer">
        Don't have an account?
        <a href="/signup" class="signup-link">Sign Up</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
// import { useSupabase } from '../utils/supabase'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

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
    // await navigateTo('/dashboard')
  }
}
watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/dashboard')
  }
})

</script>

<style scoped>
/* Page background */
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 20px;
}

/* Card */
.login-card {
  background-color: #fff;
  color: #333;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.login-card:hover {
  transform: translateY(-5px);
}

/* Title */
.login-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 0.95rem;
  margin-bottom: 24px;
  color: #666;
}

/* Inputs */
.login-input {
  width: 100%;
  padding: 14px 20px;
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.login-input:focus {
  outline: none;
  border-color: #6b5bff;
  box-shadow: 0 0 8px rgba(107, 91, 255, 0.3);
}

/* Button */
.login-btn {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(135deg, #6b5bff, #9b5bff);
  transition: all 0.3s ease;
}

.login-btn:hover {
  background: linear-gradient(135deg, #5847d3, #7a47d3);
  transform: scale(1.05);
}

/* Message */
.login-message {
  margin-top: 16px;
  font-size: 0.9rem;
  color: #f87171; /* red for error, you can dynamically change color if success */
}

/* Footer */
.login-footer {
  margin-top: 24px;
  font-size: 0.85rem;
  color: #666;
}

.signup-link {
  color: #6b5bff;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.signup-link:hover {
  color: #5847d3;
}
</style>
