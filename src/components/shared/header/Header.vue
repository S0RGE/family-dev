<template>
  <div>
    <h2>Header</h2>
    <ul>
      <li><router-link :to="{ name: 'home' }">home</router-link></li>
      <li><router-link :to="{ name: 'treasure' }">treasure</router-link></li>
      <li><router-link :to="{ name: 'quests' }">quests</router-link></li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss"></style>
