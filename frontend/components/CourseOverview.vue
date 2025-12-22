<template>
  <section id="courses" class="courses">
    <h2>Our Popular Courses</h2>
    <div class="course-grid">
      <div v-for="course in courses" :key="course.id" class="course-card">
        <img :src="course.image" alt="" />
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
        <NuxtLink :to="`/dashboard`" class="btn-secondary">View Course</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
  import data_analytics from '@/assets/images/data_analytics.webp'
  import web_dev from '@/assets/images/web_dev.webp'
  import ai_ml from '@/assets/images/ai_ml.webp'              
const courses = [
  { id: 1, title: "Intro to Data Analytics", description: "Learn the basics of data analysis.", image: data_analytics },
  { id: 2, title: "Web Development", description: "HTML, CSS, JavaScript for beginners.", image: web_dev },
  { id: 3, title: "AI & Machine Learning", description: "Basics of AI and ML models.", image: ai_ml },
]
</script>

<style scoped>
.courses { padding: 6rem 2rem; text-align:center; background:white; }
.courses h2 { font-size:2.5rem; color:#7b4df3; margin-bottom:3rem; }
.course-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:2rem; }
.course-card { background:#f8f5ff; border-radius:12px; padding:1.5rem; transition: all 0.3s; }
.course-card:hover { transform: translateY(-5px); box-shadow:0 10px 25px rgba(123,77,243,0.2);}
.course-card img { max-width:100%; border-radius:8px; margin-bottom:1rem; }
.btn-secondary { margin-top:1rem; display:inline-block; padding:0.5rem 1.5rem; background:#fff; color:#7b4df3; border:2px solid #7b4df3; border-radius:8px; transition:all 0.3s; }
.btn-secondary:hover { background:#7b4df3; color:#fff;}
</style>
