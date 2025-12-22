<template>
  <div class="dashboard-page">
    <!-- Header / Welcome -->
    <header class="dashboard-header">
      <h1>Welcome, {{ user?.email?.split('@')[0] }}</h1>
      <p>Here are your available courses. Keep learning and growing! 🚀</p>
    </header>
    <NuxtLink to="/generate-course" class="generate-course-link">✨ Generate Course</NuxtLink>

    <!-- Courses Section -->
    <section class="courses-section">
      <h2>Your Courses</h2>
      <div class="courses-grid">
        <div 
          v-for="course in courses" 
          :key="course.id" 
          class="course-card"
          @click="goToCourse(course.id)"
        >
          <img 
            v-if="course.image_url" 
            :src="course.image_url" 
            alt="Course Image" 
            class="course-image"
          />
          <div class="course-content">
            <h3>{{ course.title }}</h3>
            <p>{{ course.description?.slice(0, 100) }}{{ course.description?.length > 100 ? '...' : '' }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading / Empty State -->
    <div v-if="loading" class="loading">Loading courses...</div>
    <div v-else-if="!courses.length" class="empty">No courses available yet.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// import { useSupabaseClient, useSupabaseUser } from '#app'
import { navigateTo } from '#imports'

// Supabase client & current user
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Courses state
const courses = ref([])
const loading = ref(true)

// Fetch courses from Supabase
const fetchCourses = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })

  if (!error && data?.length) {
    courses.value = data
  } else {
    console.warn('No courses found or error fetching courses. Using fallback.')
    courses.value = [
      { id: 1, title: 'Intro to Vue 3', description: 'Learn the basics of Vue 3', image_url: '' },
      { id: 2, title: 'Nuxt 3 Crash Course', description: 'Learn Nuxt 3 quickly', image_url: '' },
      { id: 3, title: 'Supabase Authentication', description: 'Set up auth using Supabase', image_url: '' }
    ]
  }
  loading.value = false
}

onMounted(fetchCourses)

// Navigate to course page
const goToCourse = (id) => navigateTo(`/courses/${id}`)
</script>

<style scoped>
.dashboard-page {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: auto;
  min-height: 100vh;
}

/* Header */
.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}
.dashboard-header h1 {
  font-size: 2.5rem;
  font-weight: 900;
  color: #7b4df3;
}
.dashboard-header p {
  font-size: 1.1rem;
  color: #555;
  margin-top: 0.5rem;
}
.generate-course-link {
  display: inline-block;
  margin: 0 auto 3rem auto;
  padding: 0.75rem 1.5rem;
  background: #7b4df3;
  color: white;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
  box-shadow: 0 8px 15px rgba(123, 77, 243, 0.2);
  transition: background-color 0.3s, box-shadow 0.3s;
}

/* Courses Grid */
.courses-section h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #7b4df3;
  margin-bottom: 1.5rem;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.course-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}
.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0,0,0,0.15);
}

.course-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.course-content {
  padding: 1rem 1.2rem;
}
.course-content h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #4a1fbf;
  margin-bottom: 0.5rem;
}
.course-content p {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.4;
}

/* Loading / Empty State */
.loading, .empty {
  text-align: center;
  font-size: 1.2rem;
  color: #777;
  margin-top: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-page {
    padding: 3rem 1rem;
  }
}
</style>
