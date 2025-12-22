<template>
  <section id="testimonials" class="testimonials">
    <h2>What Our Students Say</h2>
    <div class="testimonial-grid">
      <div class="testimonial" v-for="(t, i) in testimonials" :key="i">
        <img :src="t.photo" :alt="t.name" class="testimonial-photo" />
        <p class="feedback">"{{ t.feedback }}"</p>
        <h4 class="student-name">{{ t.name }}</h4>
      </div>
    </div>
  </section>
</template>

<script setup>
  import testimonialImg1 from '@/assets/images/testimonial1.webp'
  import testimonialImg2 from '@/assets/images/testimonial2.webp'  
  import testimonialImg3 from '@/assets/images/testimonial3.webp'
  import testimonialImg4 from '@/assets/images/testimonial4.webp'
const testimonials = [
  {
    name: "Selam H.",
    feedback: "YegnaLearn helped me start my web dev career!",
    photo: testimonialImg1
  },
  {
    name: "Surafel T.",
    feedback: "The courses are clear and easy to follow.",
    photo: testimonialImg4
  },{
    name: "Rediet A.",
    feedback: "YegnaLearn helped me start my web dev career!",
    photo: testimonialImg2
  },
  {
    name: "Mulugeta D.",
    feedback: "I love learning at my own pace.",
    photo: testimonialImg3
  }
  
]
</script>

<style scoped>
.testimonials {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #fdf6ff, #f3f0ff);
  text-align: center;
}

.testimonials h2 {
  color: #7b4df3;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-weight: 700;
}

.testimonial-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2.5rem;
}

.testimonial {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 250px;
  text-align: center;
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 50px 10px 50px 10px; 
  box-shadow: 0 15px 30px rgba(123, 77, 243, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(123, 77, 243, 0.2);
}

.testimonial-photo {
  width: 100px;
  height: 100px;
  border-radius: 50px 10px 50px 10px;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #7b4df3;
}

.feedback {
  font-style: italic;
  color: #4b4b4b;
  margin-bottom: 0.75rem;
}

.student-name {
  color: #7b4df3;
  font-weight: 600;
  margin: 0;
  font-size: 1.1rem;
}

@media (max-width: 600px) {
  .testimonial-grid {
    gap: 1.5rem;
  }
}
</style>
