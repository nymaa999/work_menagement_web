import { defineStore } from 'pinia'
import axios from 'axios';

export interface User {
  id: string | number
  username: string
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
    users: [] as User[],
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
        const response = await axios.post('http://localhost:9911/api/auth/register', {
          name: form.name,
          email: form.email,
          password: form.password, 
        })
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
          email: email,
          password: password
        })
    
        const user = response.data
        // console.log('User:', user.name, user.email)
    
        if (!user.name || !user.email) {
          throw new Error('Нэвтрэхэд алдаа гарлаа!')
        }
    
        // Хэрэглэгчийн мэдээллийг хадгалах (локал эсвэл санах ойд)
        localStorage.setItem('user', JSON.stringify(user))
    
        // Төлвийг шинэчлэх
        this.currentUser = user
        this.isAuthenticated = true
    
        // Хуудас руу шилжих
        navigateTo('/dashboard')
    
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

    // initializeUser() {
    //   const userStr = localStorage.getItem('user')
    
    //   if (userStr) {
    //     try {
    //       const user = JSON.parse(userStr)
    //       this.currentUser = user
    //       this.isAuthenticated = true
    //     } catch (error) {
    //       console.error('Failed to parse user data:', error)
    //       localStorage.removeItem('user')
    //       this.currentUser = null
    //       this.isAuthenticated = false
    //     }
    //   } else {
    //     this.currentUser = null
    //     this.isAuthenticated = false
    //   }
    
    //   this.error = null
    // }
    async getUsers(){
      try {
        this.loading = true
        this.error = null

        const response = await axios.get('http://localhost:9911/api/auth/all-users')
        // console.log("this is res:",response.data);

        this.users = response.data 
        console.log("this is users:",this.users);

      }
      catch (error) {
        this.error = 'Failed to fetch users'
      }
      finally {
        this.loading = false
      }
    }
  }
}) 