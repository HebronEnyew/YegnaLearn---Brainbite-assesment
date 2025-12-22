<template>
  <div class="generate-page">
    <h1>Generate a New Course</h1>

    <input v-model="subject" placeholder="Course subject *" />
    <input v-model="level" placeholder="Level (optional)" />
    <input v-model="language" placeholder="Language (optional)" />

    <button @click="generate" :disabled="loading">
      {{ loading ? 'Generating...' : '✨ Generate Course' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const subject = ref('')
const loading = ref(false)

const generate = async () => {
  if (!subject.value) {
    alert('Subject required')
    return
  }

  loading.value = true

  try {
    const res = await $fetch('/courses/generate', {
      method: 'POST',
      body: {
        courseTitle: subject.value,
      },
    })

    

    if (!res?.course_id) {
      throw new Error('No course_id returned')
      
    }
    console.log('Generate response:', res)

    navigateTo(`/courses/${res.course_id}`)
  } catch (err) {
    console.error(err)
    alert('Failed to generate course')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>   
.generate-page h1 {
  text-align: center;
  margin-bottom: 2rem;
  color:#693ed1;
}                       
.generate-page {
  max-width: 400px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.generate-page input {
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}
.generate-page button {
  padding: 0.75rem 1rem;
  background-color: #7b4df3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.generate-page button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
.generate-page button:hover:enabled {
  background-color: #693ed1;
}

@media (max-width: 500px) {
  .generate-page {
    margin: 1rem;
  }
}    


</style>