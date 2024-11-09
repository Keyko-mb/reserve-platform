import axios from 'axios'
import { defineStore } from 'pinia'

export const useParameters = defineStore('parameters', {
  state: () => ({
    regions: [],
    cities: [],
    categories: [],
    states: [],
    types: [],
    purposes: [],
  }),
  actions: {
    fetchParameters() {
      try {
        axios.get('regions').then((response) => {
          this.regions = response.data
        });
        axios.get('categories').then((response) => {
          this.categories = response.data
        });
        axios.get('states').then((response) => {
          this.states = response.data
        });
        axios.get('types').then((response) => {
          this.types = response.data
        });
        axios.get('purposes').then((response) => {
          this.purposes = response.data
        });
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },
    fetchCities(regionId) {
      if (regionId) {
        axios.get(`regions/cities/${regionId}`).then((response) => {
          this.cities = response.data
        });
      }
    }
  },
})
