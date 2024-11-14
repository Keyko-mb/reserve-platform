<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import * as bootstrap from 'bootstrap';
import EditAndDeleteButtons from '@/components/UI/EditAndDeleteButtons.vue'
import MyAddModal from '@/components/UI/MyAddModal.vue'
import ReserveForm from '@/components/Forms/ReserveForm.vue'
import MyEditModal from '@/components/UI/MyEditModal.vue'
import MyMapModal from '@/components/UI/MyMapModal.vue'
import MyImgModal from '@/components/UI/MyImgModal.vue'

const props = defineProps(['reserves', 'img'])
const emits = defineEmits(['addReserve', 'deleteReserve', 'editReserve'])

const selectedReserve = ref(null)
const mapTitle = ref('');
const mapCoordinates = ref({ x: 0, y: 0 });
const modalImages = ref([])
const modalEditImages = ref(null)

let modalAddInstance;
let modalEditInstance;
let modalMap;
let modalImg;

const searchQuery = ref('');

const filteredReserves = computed(() => {
  return props.reserves.filter(reserve =>
    reserve.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  modalAddInstance = new bootstrap.Modal(document.getElementById('reserveAddModal'))
  modalEditInstance = new bootstrap.Modal(document.getElementById('reserveEditModal'))
  modalMap = new bootstrap.Modal(document.getElementById('reserveMapModal'))
  modalImg = new bootstrap.Modal(document.getElementById('reserveImgModal'))
})

const emitAddReserve = (newReserve, img) => {
  emits('addReserve', newReserve, img)
  modalAddInstance.hide();
}

const emitDeleteReserve = (reserveId) => {
  emits('deleteReserve', reserveId)
}

const emitEditReserve = (updatedReserve, img) => {
  emits('editReserve', updatedReserve, img)
  modalEditInstance.hide();
}

const showReserveEditModal= (reserve) => {
  selectedReserve.value = { ...reserve }
  modalEditImages.value = reactive({ ...props.img[reserve.id] });
  modalEditInstance.show();
}

const showReserveAddModal= () => {
  modalAddInstance.show();
}

const showMapModal = (reserve) => {
  mapTitle.value = reserve.name
  mapCoordinates.value = { x: reserve.x, y:reserve.y}
  modalMap.show();
}

const showImgModal = (reserve) => {
  modalImages.value = props.img[reserve.id] || []
  modalImg.show();
}

</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input
        type="text"
        v-model="searchQuery"
        class="form-control w-25"
        placeholder="Поиск по названию..."
      />
      <button class="btn btn-success" @click="showReserveAddModal">Добавить</button>
    </div>
  </div>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead class="table-success align-middle">
      <tr>
        <th>Id</th>
        <th>Название</th>
        <th>Описание</th>
        <th>Регион</th>
        <th>Город</th>
        <th>Дата создания</th>
        <th>Категория</th>
        <th>Состояние</th>
        <th>Тип</th>
        <th>Цель</th>
        <th>Департамент</th>
        <th>Количество кластеров</th>
        <th>Размер</th>
        <th>Охраняемый размер</th>
        <th>Почта</th>
        <th>Руководитель</th>
        <th>Телефон</th>
        <th>Электронная почта</th>
        <th>Ссылка</th>
        <th>Изображения</th>
        <th>Местоположение</th>
        <th>Действия</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="reserves.length === 0">
        Записи отсутствуют
      </tr>
      <tr v-else v-for="reserve in filteredReserves" :key="reserve.id">
        <th>{{ reserve.id }}</th>
        <td>{{ reserve.name }}</td>
        <td>{{ reserve.description }}</td>
        <td>{{ reserve.region.name }}</td>
        <td>{{ reserve.city.name }}</td>
        <td>{{ reserve.dataCreate }}</td>
        <td>{{ reserve.category.name }}</td>
        <td>{{ reserve.state.name }}</td>
        <td>{{ reserve.type.name }}</td>
        <td>{{ reserve.purpose.name }}</td>
        <td>{{ reserve.department }}</td>
        <td>{{ reserve.countCluster }}</td>
        <td>{{ reserve.size }}</td>
        <td>{{ reserve.guardedSize }}</td>
        <td>{{ reserve.mail }}</td>
        <td>{{ reserve.supervisor }}</td>
        <td>{{ reserve.phone }}</td>
        <td>{{ reserve.email }}</td>
        <td>
          <a :href="reserve.link">{{ reserve.link }}</a>
        </td>
        <td>
          <button class="btn btn-link p-0" @click="showImgModal(reserve)">Посмотреть</button>
        </td>
        <td>
          <button class="btn btn-link p-0" @click="showMapModal(reserve)">Показать на карте</button>
        </td>
        <td>
          <EditAndDeleteButtons @deleteClick="emitDeleteReserve(reserve.id)" @editClick="showReserveEditModal(reserve)"/>
        </td>
      </tr>
      </tbody>
    </table>
    <div>
      <MyAddModal
        id="reserveAddModal"
        :title="'Добавить заповедник'"
        @saveReserveData="emitAddReserve">
      </MyAddModal>
      <MyEditModal
        id="reserveEditModal"
        :title="'Редактировать заповедник'">
        <ReserveForm
          :key="selectedReserve? selectedReserve.id : ''"
          v-if="selectedReserve && modalEditImages"
          :reserve="selectedReserve"
          :img="modalEditImages"
          @saveReserveData="emitEditReserve">
        </ReserveForm>
      </MyEditModal>
      <MyMapModal
          id="reserveMapModal"
          v-show="mapTitle"
          :title="mapTitle"
          :x="mapCoordinates.x"
          :y="mapCoordinates.y">
      </MyMapModal>
      <MyImgModal
          id="reserveImgModal"
          v-show="modalImages"
          :img="modalImages">
      </MyImgModal>
    </div>
  </div>
</template>

<style scoped>
.table {
  border-collapse: collapse;
}
.table-success {
  background-color: #e9f7ef;
}
</style>
