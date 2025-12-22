<template>
  <section id="how-it-works" class="how">
    <h2>How It Works</h2>
    <div class="steps">
      <div class="step" v-for="(step,index) in steps" :key="index">
        <div class="step-number">{{ index+1 }}</div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { title:"Sign Up", description:"Create your account in seconds." },
  { title:"Choose a Course", description:"Browse and select your favorite courses." },
  { title:"Learn & Grow", description:"Start learning and track your progress." },
]
</script>

<style scoped>
.how { padding:6rem 2rem; text-align:center; background:linear-gradient(135deg,#f5f3ff,#e0d7ff);}
.how h2{color:#7b4df3; font-size:2.5rem; margin-bottom:3rem;}
.steps { display:flex; justify-content:center; gap:2rem; flex-wrap:wrap;}
.step { background:white; border-radius:12px; padding:2rem; width:250px; transition:all 0.3s;}
.step:hover { transform:translateY(-5px); box-shadow:0 10px 20px rgba(123,77,243,0.2);}
.step-number { font-size:2rem; font-weight:700; color:#7b4df3; margin-bottom:1rem;}
</style>
