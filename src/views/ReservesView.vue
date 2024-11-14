<script setup>
import ReservesComponent from '@/components/ReservesComponent.vue'
import { onMounted, ref} from 'vue'
import axios from 'axios'

const reserves = ref([]);
const img = ref({});
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = true
    await axios
      .get('reserves')
      .then((response) => {
        reserves.value = response.data

        for (const reserve of reserves.value) {
          fetchReserveImages(reserve.id);
        }

      })
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  } finally {
    isLoading.value = false
  }
})

const fetchReserveImages = async (reserveId) => {
  try {
    await axios
      .get(`images/reserve/${reserveId}`)
      .then((response) => {
        img.value[reserveId] = response.data;
      })
  } catch (error) {
    console.error("Ошибка при загрузке изображений:", error);
  }
}

const addReserve = (newReserve, img) => {
  axios.post(`reserves`, newReserve)
    .then(async (response) => {
      reserves.value.push(response.data);
      const reserveId = response.data.id;
      for (const image of img) {
        await uploadImage(image, reserveId);
      }
      await fetchReserveImages(reserveId);
    })
};

const deleteReserve = async (id) => {
  for (const image of img.value[id]) {
    await deleteImage(image.id, id);
  }
  img.value[id] = [];

  axios.delete(`reserves/${id}`)
    .then(() => {
      const index = reserves.value.findIndex(reserve => reserve.id === id);
      if (index !== -1) {
        reserves.value.splice(index, 1);
      }
    })
}

const editReserve = (updatedReserve, img) => {
  axios
    .put(`reserves/${updatedReserve.id}`, updatedReserve)
    .then(async () => {
      const index = reserves.value.findIndex(reserve => reserve.id === updatedReserve.id);
      if (index !== -1) {
        reserves.value[index] = { ...updatedReserve };
      }
      for (const image of img) {
        await uploadImage(image, updatedReserve.id);
      }
      await fetchReserveImages(updatedReserve.id);
    });
}

const uploadImage = async (file, reserveId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('reserveId', reserveId);
  try {
    await axios.post('images/upload', formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  } catch (error) {
    console.error("Ошибка при загрузке изображения, возможно файл слишком большой:", error);
  }
}

const deleteImage = async (imageId) => {
  await axios.delete(`images/${imageId}`);
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center text-success mb-4">Природные зоны</h2>
    <div v-if="!isLoading">
      <ReservesComponent
        :reserves="reserves"
        :img="img"
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
