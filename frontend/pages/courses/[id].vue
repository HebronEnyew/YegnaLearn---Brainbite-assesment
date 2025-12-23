<template>
  <div class="course-page">
    
    <!-- Sidebar with course sections -->
     
    <aside class="sidebar">
      
      <h2>
        <span class="back-button" @click="goBack">
          ←
        </span>
    {{ course?.title }}</h2>
      <ul>
        <li 
          v-for="section in sections" 
          :key="section.id" 
          :class="{ active: section.id === selectedSection?.id }"
          @click="selectSection(section)"
        >
          {{ section.title }}
        </li>
      </ul>
    </aside>

    <!-- Main content -->
    <main class="main-content" v-if="selectedSection">
      <h1>{{ selectedSection.title }}</h1>
      <button
        class="tts-btn"
        @click="speak(selectedSection.content_md)"
      >
        🔊 Listen to this lesson
      </button>

      <p v-html="selectedSection.content_md"></p>
      <img v-if="selectedSection.image_url" :src="selectedSection.image_url" />
      <div>
        <!-- <h2>Course Videos</h2> -->
        <div v-for="video in filteredVideos" :key="video.id" class="video-block">
          <h2>{{ video.title }}</h2>
          <p>{{ video.description }}</p>
              <!-- <video
            v-if="video.url"
            controls
            :src="video.url"
            class="video-frame"
          ></video> -->

           <iframe
              v-if="isYouTube(video.url)"
              :src="getYouTubeEmbedUrl(video.url)"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="video-frame"
            ></iframe>
          <p v-else>No videos yet</p> 
        </div>
      </div>
    </main>

    <!-- Empty state -->
    <div v-else class="empty-state">
      Loading course content...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSupabaseClient } from '#imports'

const supabase = useSupabaseClient()
const route = useRoute()

const course = ref(null)
const sections = ref([])
const selectedSection = ref(null)
const videos = ref([])


const fetchCourse = async () => {
  const courseId = route.params.id

  if (!courseId || courseId === 'undefined') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid course ID',
    })
  }

  // Fetch course
  const { data: courseData, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single()

  if (courseError) {
    console.error(courseError)
    return
  }

  course.value = courseData
  console.log('Fetched course:', courseData)

  // Fetch course pages
  const { data: pagesData, error: pagesError } = await supabase
    .from('course_pages')
    .select('*')
    .eq('course_id', courseId)
    .order('page_index', { ascending: true })

  console.log('Fetched pages:', pagesData)

  if (pagesError) {
    console.error(pagesError)
    return
  }

  sections.value = pagesData
  selectedSection.value = pagesData?.[0] || null
}


const fetchVideos = async () => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('course_id', route.params.id)
    .order('page_index', { ascending: true })

  console.log('Fetched videos:', data)

  if (error) {
    console.error(error)
    return
  }

  videos.value = data
}

/* ================= VIDEO FILTERING ================= */
const filteredVideos = computed(() => {
  if (!selectedSection.value || !sections.value.length) return []

  const firstSection = sections.value[0]

  if (selectedSection.value.id !== firstSection.id) {
    return []
  }

  return videos.value.filter(
    (video) => video.page_index === firstSection.page_index
  )
})

/* ================= HELPERS ================= */
const isYouTube = (url) =>
  typeof url === 'string' &&
  (url.includes('youtube.com') || url.includes('youtu.be'))

const getYouTubeEmbedUrl = (url) => {
  if (!url) return ''
  if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/')
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1].split('?')[0]
    return `https://www.youtube.com/embed/${id}`
  }
  return url
}

onMounted(async () => {
  await fetchCourse()
  await fetchVideos()
})

watch(() => route.params.id, async () => {
  await fetchCourse()
  await fetchVideos()
})

/* === UI ACTIONS == */
const selectSection = (section) => {
  selectedSection.value = section
}
//TTS
const speak = (text) => {
  if (!text) return

  // Stop any previous speech
  speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1
  utterance.pitch = 1
  utterance.lang = 'en-US'

  speechSynthesis.speak(utterance)
}

const goBack = () => {
  navigateTo('/dashboard')
}
</script>


<style scoped>
.course-page {
  display: flex;
  min-height: 100vh;
  padding-top: 0px; 
}

.back-button {
  cursor: pointer;
  font-weight: 900;
  color: #fff;
  margin: 3px;
  display: inline-block;
  transition: all 0.2s;
}
.back-button:hover {
  color: #fff;
  transform: translateX(-3px);
} 
/* Sidebar */
.sidebar {
  width: 280px;
  background: #7b4df3;
  color: white;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
}
.sidebar h2 {
  font-size: 1.7rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}
.sidebar li:hover,
.sidebar li.active {
  background: #a15df8;
  font-weight: 700;
}

/* Main content */
.main-content {
  flex: 1;
  padding: 2rem;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.main-content h1 {
  font-size: 2rem;
  font-weight: 900;
  color: #7b4df3;
}
.main-content p {
  line-height: 1.6;
  color: #333;
}
.main-content img {
  max-width: 600px;
  border-radius: 12px;
  margin-top: 1rem;
}

.video-block {
  margin-bottom: 2rem;
}

iframe.video-frame {
  width: 100%;
  height: 400px;
  border-radius: 12px;
}
.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #777;
}

.tts-btn {
  background: #7b4df3;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  width: fit-content;
}
.tts-btn:hover {
  background: #693ed1;
}


/* Responsive */
@media(max-width: 992px) {
  .course-page {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding: 1rem;
  }
  .sidebar li {
    margin-right: 0.5rem;
    margin-bottom: 0;
  }
  .main-content {
    padding: 1rem;
  }
  .video-block iframe {
    height: 250px;
  }
  .video-block h3 {
    font-size: 1rem;
  }                       
}
</style>
