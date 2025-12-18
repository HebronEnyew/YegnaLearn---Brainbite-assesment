<script setup lang="ts">
interface Course {
  id: number
  title: string
  description?: string
}

const { data: courses, pending, error } = await useFetch<Course[]>(
  'http://localhost:3001/courses'
)
</script>

<template>
  <div>
    <h1>Courses</h1>

    <div v-if="pending">Loading courses...</div>
    <div v-else-if="error">Failed to load courses</div>

    <ul v-else>
      <li v-for="course in courses" :key="course.id">
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
        <NuxtLink :to="`/courses/${course.id}`">View Details</NuxtLink>
      </li>
    </ul>
  </div>
</template>
