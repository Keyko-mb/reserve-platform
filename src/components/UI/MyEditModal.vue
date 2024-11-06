<script setup>

</script>

<template>
  <div class="modal fade" id="reserveEditModal" tabindex="-1" aria-labelledby="reserveEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reserveEditModalLabel">Редактировать заповедник</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
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
