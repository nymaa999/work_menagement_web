import { defineStore } from 'pinia'
import axios from 'axios';
import type { User } from './user' // хэрвээ тусдаа файлд байвал

export interface ProjectForm {
  proName: string
  proDesc: string
  proType: string
  proStatus: string
  proStartDate: string // yyyy-MM-dd format
  proMembers: string[]
  proEndDate: string // yyyy-MM-dd format
  // priority: string
}

export interface Project extends ProjectForm {
  id: string
}

export interface ProjectList extends Project{
  id: string
}


export const useProjectStore = defineStore('project', {
  state: () => ({
    currentProject: null as Project | null,
    loading: false,
    error: null as string | null,
    projects: [] as ProjectList[],
    totalProjects: 0,
  }),

  getters: {
    getProject: (state) => state.currentProject,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    getProjects: (state) => state.projects,
    getTotalProjects: (state) => state.totalProjects,
  },

  actions: {
    async createProject(form: ProjectForm) {
      try {
        this.loading = true
        this.error = null

        const response = await axios.post('http://localhost:9911/api/projects/create', form)
        const project = response.data

        localStorage.setItem('project', JSON.stringify(project))
        this.currentProject = project

      } catch (error) {
        this.error = 'Failed to create project'
      } finally {
        this.loading = false
      }
    },
    async getAllProjects() {
      try {
        this.loading = true
        this.error = null
    
        const response = await axios.get('http://localhost:9911/api/projects/getAll')
        console.log("this is res:",response.data);

        this.projects = response.data 
        console.log("this is projects:",this.projects);
    
        this.totalProjects = this.projects.length
    
      } catch (error) {
        this.error = 'Failed to fetch projects'
      } finally {
        this.loading = false
      }
    },
    async updateProject(id: string, form: ProjectForm) {
      try {
        this.loading = true
        this.error = null

        const response = await axios.put(`http://localhost:9911/api/projects/${id}`, form)
        this.currentProject = response.data

      } catch (error) {
        this.error = 'Failed to update project'
      } finally {
        this.loading = false
      }
    },

    async deleteProject(id: string) {
      try {
        this.loading = true
        this.error = null

        await axios.delete(`http://localhost:9911/api/projects/${id}`)
        localStorage.removeItem('project')
        this.currentProject = null

      } catch (error) {
        this.error = 'Failed to delete project'
      } finally {
        this.loading = false
      }
    }
  }
})

// export const useProjectStore = defineStore('project', {
//   state: () => ({
//     currentProject: null as Project | null,
//     loading: false,
//     error: null as string | null,
//     projects: [] as Project[],
//     totalProjects: 0,
//   })        