<template>
  <div class="signup-page">
    <div class="signup-card">
      <h1 class="title">Sign Up</h1>

      <input v-model="fullName" type="text" placeholder="Full Name" class="input-field" />
      <input v-model="email" type="email" placeholder="Email" class="input-field" />
      <input v-model="password" type="password" placeholder="Password" class="input-field" />

      <button @click="signup" class="btn-primary">Sign Up</button>

      <p class="message">{{ message }}</p>

      <p class="login-link">
        Already have an account? 
        <button @click="navigateTo('/login')" class="link-btn">Go to Login</button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useSupabase } from '../utils/supabase'

const supabase = useSupabaseClient()
const user = useSupabaseUser()


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
  } else {
    message.value = 'Account created ✅ You can now login'
    await navigateTo('/login')  
  }
}

</script>

<style scoped>
.signup-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f7f0ff, #ffffff);
  padding: 20px;
}

.signup-card {
  background-color: #fff;
  color: #333;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.3s;
}

.signup-card:hover {
  transform: translateY(-5px);
}

.title {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: #6b21a8; /* purple main color */
}

.input-field {
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid #ddd;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s;
}

.input-field:focus {
  border-color: #7c3aed; /* purple accent */
  box-shadow: 0 0 5px rgba(124, 58, 237, 0.3);
}

.btn-primary {
  padding: 12px;
  border-radius: 12px;
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #a78bfa, #7c3aed);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(124, 58, 237, 0.3);
}

.message {
  font-size: 0.9rem;
  color: #f87171;
  text-align: center;
  min-height: 1.2em;
}

.login-link {
  text-align: center;
  font-size: 0.9rem;
}

.link-btn {
  background: none;
  border: none;
  color: #7c3aed;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.link-btn:hover {
  text-decoration: underline;
}
</style>
