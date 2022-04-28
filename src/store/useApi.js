import { defineStore } from 'pinia'

export const useApiStore = defineStore('main', {
  state: () => ({
    ticker: null
  })
})
