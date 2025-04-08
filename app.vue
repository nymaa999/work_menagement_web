<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useUserStore } from './stores/user'

const userStore = useUserStore()

// App эхлэх үед хэрэглэгчийн төлөвийг эхлүүлэх
onMounted(() => {
  // Хэрэглэгчийн төлөвийг эхлүүлэх
  userStore.initializeUser()
})
</script> 