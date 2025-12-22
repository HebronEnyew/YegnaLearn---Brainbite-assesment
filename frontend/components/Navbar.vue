<template>
  <nav class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <NuxtLink to="/" class="navbar-left logo" replace>
        <span class="logo-icon">📚</span>
        <span class="logo-text">Yegna<span>Learn</span></span>
      </NuxtLink>

      <!-- Desktop Links -->
      <div class="navbar-center">
        <a href="/dashboard">Courses</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#benefits">Benefits</a>
        <a href="#testimonials">Testimonials</a>
        
      </div>

      <!-- Desktop Right -->
      <div class="navbar-right">
        <template v-if="!user">
          <NuxtLink to="/login" class="btn-login">Login</NuxtLink>
          <NuxtLink to="/signup" class="btn-signup">Sign Up</NuxtLink>
        </template>

        <!-- LOGGED IN -->
        <template v-else>
          <div class="profile-wrapper" ref="profileRef">
            <button class="profile-btn" @click="profileOpen = !profileOpen">
              <span class="avatar">👤</span>
              <span class="email">{{  user?.email?.split('@')[0] }}</span>
            </button>

            <transition name="fade">
              <div v-if="profileOpen" class="profile-dropdown">
                <NuxtLink :to="user ? '/dashboard' : '/login'">Dashboard</NuxtLink>
                <button @click="logout">Logout</button>
              </div>
            </transition>
          </div>
        </template>
      </div>

      <!-- Mobile Hamburger -->
      <button class="mobile-toggle" @click="dropdownOpen = !dropdownOpen">
        <span class="bar" v-for="i in 3" :key="i"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade">
      <div v-if="dropdownOpen" class="mobile-menu" ref="mobileMenuRef">
        <a href="/dashboard" @click="closeMenu">Courses</a>
        <a href="#how-it-works" @click="closeMenu">How It Works</a>
        <a href="#benefits" @click="closeMenu">Benefits</a>

        <!-- Mobile Auth -->
        <template v-if="!user">
          <NuxtLink to="/login" @click="closeMenu">Login</NuxtLink>
          <NuxtLink to="/signup" @click="closeMenu">Sign Up</NuxtLink>
        </template>

        <template v-else>
          <NuxtLink to="/dashboard" @click="closeMenu">Dashboard</NuxtLink>
          <button class="logout-btn" @click="logout">Logout</button>
        </template>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const user = useSupabaseUser()
const supabase = useSupabaseClient()

const dropdownOpen = ref(false)
const profileOpen = ref(false)

const mobileMenuRef = ref(null)
const profileRef = ref(null)

onClickOutside(mobileMenuRef, () => (dropdownOpen.value = false))
onClickOutside(profileRef, () => (profileOpen.value = false))

const closeMenu = () => {
  dropdownOpen.value = false
}

const logout = async () => {
  await supabase.auth.signOut()
  profileOpen.value = false
  dropdownOpen.value = false
  await navigateTo('/')
}
</script>

<style scoped>
/* Navbar */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 70px;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 15px rgba(0,0,0,0.06);
}

.navbar-container {
  max-width: 1400px;
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.logo-icon {
  font-size: 1.8rem;
}

.logo-text {
  font-size: 1.7rem;
  font-weight: 900;
  color: #7b4df3;
  letter-spacing: 0.5px;
}

.logo-text span {
  color: #a15df8;
}

/* Links */
.navbar-center a {
  margin: 0 1rem;
  font-weight: 600;
  color: #7b4df3;
  text-decoration: none;
}

/* Buttons */
.btn-login, .btn-signup {
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: 700;
}

.btn-login {
  border: 2px solid #7b4df3;
  color: #7b4df3;
}

.btn-signup {
  background: #7b4df3;
  color: white;
}

/* Profile */
.profile-wrapper {
  position: relative;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #7b4df3;
}

.profile-dropdown {
  position: absolute;
  right: 0;
  top: 120%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}

.profile-dropdown a,
.profile-dropdown button {
  padding: 0.7rem 1rem;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: #7b4df3;
}

/* Mobile */
.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
}

.bar {
  width: 25px;
  height: 3px;
  background: #7b4df3;
}

.mobile-menu {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.logout-btn {
  margin-top: 1rem;
  font-weight: 700;
  background: none;
  border: none;
  color: #e53935;
}

/* Anim */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .navbar-center, .navbar-right {
    display: none;
  }
  .mobile-toggle {
    display: flex;
  }
}
</style>
