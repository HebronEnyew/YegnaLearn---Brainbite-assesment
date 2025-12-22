<template>
  <section id="cta" class="cta">
    <h2>Ready to Start Learning?</h2>
    <NuxtLink :to="user ? '/dashboard' : '/signup'" class="btn-primary">Sign Up Now</NuxtLink>
  </section>
</template>

<script setup></script>

<style scoped>
.cta { padding:6rem 2rem; text-align:center; background:#7b4df3; color:white; }
.cta h2 { font-size:2.5rem; margin-bottom:2rem; }
.btn-primary { background:white; color:#7b4df3; padding:0.75rem 2rem; border-radius:8px; font-weight:600; transition:all 0.3s;}
.btn-primary:hover { transform:translateY(-3px); box-shadow:0 5px 15px rgba(255,255,255,0.3);}
</style>
