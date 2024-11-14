<script setup>
defineProps(['img'])
</script>

<template>
  <div class="modal fade" id="reserveImgModal" tabindex="-1" aria-labelledby="reserveImgModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reserveImgModalLabel">Изображения</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex justify-content-center">
          <div v-if="img.length > 0">
            <div v-for="image in img" :key="image.id" class="image-container">
              <img :src="'data:image/png;base64,' + image.image" alt="Reserve Image" width="400" class="mb-1" />
            </div>
          </div>
          <div v-else>
            <p>Нет изображений для этого заповедника</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal.fade .modal-dialog {
  transition: transform 0.3s ease-out;
}
</style>
