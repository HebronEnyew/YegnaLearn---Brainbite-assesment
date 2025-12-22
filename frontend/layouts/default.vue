<template>
  <div class="midnight-theme">
    <Navbar /> 
    <Footer />
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.midnight-theme {
  min-height: 100vh;
}
</style>