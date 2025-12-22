<template>
  <div class="courses-overview">
    <h1>All Courses</h1>
    <div class="courses-grid">
      <div 
        v-for="course in courses" 
        :key="course.id" 
        class="course-card"
      >

        <img v-if="course.image_url" :src="course.image_url" />
        <h2>{{ course.title }}</h2>
        <p>{{ course.description }}</p>
        <NuxtLink :to="`/courses/${course.id}`" class="btn">View Course</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const courses = ref([])

const fetchCourses = async () => {
  const { data } = await supabase.from('courses').select('*').order('created_at')
  courses.value = data || []
}

onMounted(fetchCourses)
</script>

<style scoped>
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
.course-card {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.course-card img {
  width: 100%;
  border-radius: 8px;
}
.course-card h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #7b4df3;
}
.course-card p {
  color: #555;
  font-size: 0.95rem;
  flex: 1;
}
.btn {
  margin-top: auto;
  padding: 0.5rem 1rem;
  background: #7b4df3;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  text-decoration: none;
}
</style>
