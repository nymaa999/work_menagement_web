import { defineStore } from 'pinia'
import axios from 'axios';

interface User {
  id: string | number
  name: string
  email: string
  avatar?: string
}

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword?: string
  acceptTerms?: boolean
}

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
    loading: false,
    error: null as string | null,
    isAuthenticated: false
  }),

  getters: {
    getUser: (state) => state.currentUser,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    isLoggedIn: (state) => state.isAuthenticated,
    getUserId: (state) => state.currentUser?.id,
    getUserEmail: (state) => state.currentUser?.email,
    getUserAvatar: (state) => state.currentUser?.avatar
  },

  actions: {
    async register(form: RegisterForm) {
      try {
        this.loading = true
        this.error = null
    
        console.log("it's working");
        // Backend рүү API хүсэлт илгээх
        const response = await axios.post('http://localhost:9911/api/auth/register', {
          name: form.name,
          email: form.email,
          password: form.password, // Backend-д илгээх шаардлагатай
        })
    
        // Амжилттай бүртгэгдсэн хэрэглэгчийн мэдээлэл авах
        const user = response.data
    
        // LocalStorage-д хадгалах
        localStorage.setItem('user', JSON.stringify(user))
    
        // State шинэчлэх
        this.currentUser = user
        this.isAuthenticated = true
    
        // Бүртгэлийн дараа профайл хуудас руу шилжих
        // navigateTo('/profile')
    
        return user
      } catch (error) {
        console.error('Registration failed:', error)
        this.error = 'Бүртгэл амжилтгүй'
        throw error
      } finally {
        this.loading = false
      }
    },

    async loginWithGoogle() {
      try {
        this.loading = true
        const config = useRuntimeConfig()
        const clientId = config.public.googleClientId
        const redirectUri = 'http://localhost:3000/auth/google/callback'
        
        // Google OAuth URL үүсгэх
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${clientId}&` +
          `redirect_uri=${encodeURIComponent(redirectUri)}&` +
          `response_type=code&` +
          `scope=email profile&` +
          `access_type=offline&` +
          `prompt=consent`

        // Google login цонх нээх
        window.location.href = authUrl
      } catch (error) {
        console.error('Google login error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async loginWithFacebook() {
      try {
        this.loading = true
        const config = useRuntimeConfig()
        const clientId = config.public.facebookClientId
        const redirectUri = window.location.origin + '/auth/facebook/callback'
        
        // Facebook OAuth URL үүсгэх
        const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?` +
          `client_id=${clientId}&` +
          `redirect_uri=${encodeURIComponent(redirectUri)}&` +
          `scope=email public_profile`

        // Facebook login цонх нээх
        window.location.href = authUrl
      } catch (error) {
        console.error('Facebook login error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string) {
      try {
        this.loading = true
        this.error = null
    
        // Spring Boot серверт нэвтрэх хүсэлт илгээх
        const response = await axios.post('http://localhost:9911/api/auth/login', {
          name: email, // API-тай нийцүүлэхийн тулд `username`
          password: password
        })
    
        const { user, token } = response.data
    
        if (!user || !token) {
          throw new Error('Нэвтрэхэд алдаа гарлаа!')
        }
    
        // JWT Token-ийг хадгалах
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    
        // Төлвийг шинэчлэх
        this.currentUser = user
        this.isAuthenticated = true
    
        // Профайл хуудас руу шилжих
        navigateTo('/profile')
    
        return user
      } catch (error) {
        this.error = 'Нэвтрэхэд алдаа гарлаа. Нууц үгээ шалгана уу!'
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      // Clear localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('currentUser')
      
      // Reset state
      this.currentUser = null
      this.isAuthenticated = false
      this.error = null

      // Нэвтрэх хуудас руу шилжих
      navigateTo('/login')
    },

    initializeUser() {
      this.currentUser = null
      this.isAuthenticated = false
      this.error = null
    
      // Token байгаа эсэхийг шалгах
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
    
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr)
          this.currentUser = user
          this.isAuthenticated = true
        } catch (error) {
          console.error('Failed to parse user data:', error)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      }
    }    
  }
}) 