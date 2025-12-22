<template>
  <section class="hero">
    <div class="hero-content">
      <h1>Learn, Grow, and Achieve with YegnaLearn</h1>
      <p>Access top courses in Web Dev, Data Analytics, AI & more — designed for beginners and pros alike.</p>
      <NuxtLink :to="user ? '/dashboard' : '/signup'" class="btn-primary">Get Started</NuxtLink>
    </div>
    <div class="hero-image">
      <img :src="heroImg" alt="Learning Illustration" />
    </div>
  </section>
</template>

<script setup>
  import heroImg from '@/assets/images/hero1.webp'
  const user = useSupabaseUser()
</script>

<style scoped>
.hero {
  display: flex; justify-content: space-around;
  align-items: center; padding: 6rem 2rem;
  background: linear-gradient(135deg, #f5f3ff, #e0d7ff);
  flex-wrap: wrap;
}
.hero-content { max-width: 600px; }
.hero-content h1 { font-size: 3rem; color: #7b4df3; margin-bottom: 1rem; }
.hero-content p { font-size: 1.1rem; color: #555; margin-bottom: 2rem; }
.btn-primary {
  padding: 0.75rem 2rem; background: #7b4df3; color: white;
  border-radius: 8px; font-weight: 600; transition: all 0.3s;
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(123,77,243,0.3);}
.hero-image img { max-width: 500px; width: 100%; margin-top: 2rem; }
@media(max-width:768px){ .hero{flex-direction:column; text-align:center;} }
</style>
