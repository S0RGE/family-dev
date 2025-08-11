<template>
  <div>
    <Header />
    <div>
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/shared/footer/Footer.vue';
import Header from '@/components/shared/header/Header.vue';
</script>
