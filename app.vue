<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// Watch currentUser -> хадгалах
watch(
  () => userStore.currentUser,
  (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser))
    } else {
      localStorage.removeItem('user')
    }
  },
  { deep: true }
)

</script> 