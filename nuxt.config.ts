// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Work Management System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Work Management System using Nuxt 3' }
      ]
    }
  },

  vite: {
    server: {
      hmr: {
        overlay: true
      }
    }
  },

  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      facebookClientId: process.env.FACEBOOK_CLIENT_ID
    }
  },

  compatibilityDate: '2025-03-24'
})