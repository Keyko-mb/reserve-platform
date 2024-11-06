<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['editClick', 'deleteClick']);

const emitEdit = () => {
  emit('editClick');
};
const emitDelete = () => {
  emit('deleteClick');
};
</script>

<template>
  <div class="d-flex align-items-center gap-2">
    <button @click="emitEdit" class="btn btn-sm p-1" aria-label="Edit">
      <img src="/edit.svg" alt="edit" class="icon" />
    </button>
    <button @click="emitDelete" class="btn btn-sm p-1" aria-label="Delete">
      <img src="/delete.svg" alt="delete" class="icon" />
    </button>
  </div>
</template>

<style scoped>
.icon {
  width: 25px;
  height: 25px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.icon:hover {
  opacity: 1;
}
</style>
