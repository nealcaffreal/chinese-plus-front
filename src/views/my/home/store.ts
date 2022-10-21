import { defineStore } from 'pinia'

export const useStore = defineStore('auth', {
  state: () => {
    return {
      param: '',
    }
  },
  getters: {
    aaa(state) {
      return state.param
    },
  },
  actions: {
    async logout() {
      this.$reset()
    },
  },
})
