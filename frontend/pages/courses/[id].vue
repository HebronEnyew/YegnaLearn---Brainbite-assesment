<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const id = route.params.id

const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}`)
    const json = await res.json()
    data.value = json
    console.log('Fetched data:', json)
  } catch (err) {
    error.value = err
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>Course Details</h1>

    <div v-if="loading">Loading course details...</div>
    <div v-else-if="error">Failed to load course</div>
    <div v-else>
      <h2>{{ data.course.title }}</h2>
      <p>{{ data.course.description }}</p>
      <NuxtLink :to="`/courses`">View Courses</NuxtLink>

        <!-- Example: render pages if any -->
      <div v-if="data.pages.length">
        <h3>Course Lessons</h3>
        <ul>
            <li v-for="page in data.pages" :key="page.id">
            <strong>{{ page.page_index }}. {{ page.title }}</strong>
            <p>{{ page.content_md }}</p>
            </li>
        </ul>
      </div>

      <!-- Example: render questions if any -->
      <div v-if="data.questions.length">
        <h3>Assessment</h3>
        <div v-for="q in data.questions" :key="q.id">
            <p>{{ q.question_text }}</p>
            <ul>
            <li v-for="opt in q.options" :key="opt.id">
                <input type="radio" :name="q.id" /> {{ opt.option_text }}
            </li>
            </ul>
        </div>
      </div>

    </div>
  </div>
</template>
