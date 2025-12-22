<template>
  <section id="benefits" class="benefits">
    <h2>Why Choose YegnaLearn?</h2>

    <div class="benefit-grid">
      <div class="benefit" v-for="(b, i) in benefits" :key="i">
        <div class="icon">
          <component :is="b.icon" />
        </div>

        <div class="content">
          <h3>{{ b.title }}</h3>
          <p>{{ b.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { GraduationCap, Clock, Users } from 'lucide-vue-next'

const benefits = [
  {
    icon: GraduationCap,
    title: 'Expert Instructors',
    desc: 'Learn from experienced professionals who teach real-world skills.'
  },
  {
    icon: Clock,
    title: 'Flexible Learning',
    desc: 'Access courses anytime, anywhere, and learn at your own pace.'
  },
  {
    icon: Users,
    title: 'Community Support',
    desc: 'Join a supportive learning community and grow together.'
  }
]
</script>

<style scoped>
/* Section */
.benefits {
  padding: 6rem 2rem;
  background: #fafafa;
}

.benefits h2 {
  text-align: center;
  color: #7b4df3;
  font-size: 2.4rem;
  margin-bottom: 4rem;
}

/* Grid */
.benefit-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Rectangle card */
.benefit {
  display: flex;
  gap: 1.2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 32px rgba(123, 77, 243, 0.18);
}

/* Purple icon box */
.icon {
  min-width: 52px;
  height: 52px;
  border-radius: 12px;
  background: #f2ecff;
  color: #7b4df3;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* SVG size */
.icon svg {
  width: 24px;
  height: 24px;
}

/* Text */
.content h3 {
  margin: 0 0 0.4rem;
  font-size: 1.25rem;
  color: #222;
}

.content p {
  margin: 0;
  color: #555;
  line-height: 1.6;
}

/* Mobile */
@media (max-width: 600px) {
  .benefit {
    padding: 1.5rem;
  }
}
</style>
