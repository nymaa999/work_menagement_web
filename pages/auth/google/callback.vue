<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Нэвтрэх үйл явц...</h1>
      <p class="text-gray-600">Түр хүлээнэ үү...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// Хуудас ачаалагдахад автоматаар ажиллах
onMounted(async () => {
  const code = route.query.code as string
  
  if (code) {
    try {
      // Server API руу дуудлага хийх
      const response = await $fetch('/api/auth/google/callback', {
        method: 'GET',
        params: { code }
      })

      // Cookie-гээс хэрэглэгчийн мэдээлэл уншиж авах
      const userCookie = useCookie('user')
      
      // Cookie-г шалгах
      console.log('User cookie:', userCookie.value)
      
      if (userCookie.value) {
        const userData = JSON.parse(userCookie.value)
        console.log('Parsed user data:', userData)
        
        // Store-д хэрэглэгчийн мэдээлэл хадгалах
        await userStore.$patch({
          currentUser: userData,
          isAuthenticated: true
        })

        // localStorage-д хадгалах
        localStorage.setItem('user', JSON.stringify(userData))
        console.log('User data saved, redirecting to profile')

        // Профайл хуудас руу шилжих
        await navigateTo('/profile')
      } else {
        console.error('No user cookie found')
        await navigateTo('/login?error=no_user_data')
      }
    } catch (error) {
      console.error('Google callback error:', error)
      await navigateTo('/login?error=google_auth_failed')
    }
  } else {
    await navigateTo('/login?error=no_code')
  }
})
</script> 