<script setup>
import ReservesComponent from '@/components/ReservesComponent.vue'
import { onMounted, ref} from 'vue'
import axios from 'axios'

const reserves = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true
    await axios
      .get('reserves')
      .then((response) => {
        reserves.value = response.data
      })
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  } finally {
    isLoading.value = false
  }
})

const addReserve = (newReserve) => {
  axios.post(`reserves`, newReserve)
    .then((response) => {
      reserves.value.push(response.data);
    })
};

const deleteReserve = (id) => {
  axios.delete(`reserves/${id}`)
    .then(() => {
      const index = reserves.value.findIndex(reserve => reserve.id === id);
      if (index !== -1) {
        reserves.value.splice(index, 1);
      }
    })
}

const editReserve = (updatedReserve) => {
  axios
    .put(`reserves/${updatedReserve.id}`, updatedReserve)
    .then(() => {
      const index = reserves.value.findIndex(reserve => reserve.id === updatedReserve.id);
      if (index !== -1) {
        reserves.value[index] = { ...updatedReserve };
      }
    });
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center text-success mb-4">Природные зоны</h2>
    <div v-if="!isLoading">
      <ReservesComponent
        :reserves="reserves"
        @addReserve="addReserve"
        @deleteReserve="deleteReserve"
        @editReserve="editReserve"/>
      </div>
    <div v-else>
      Идет загрузка...
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #2d6a4f;
}
</style>
