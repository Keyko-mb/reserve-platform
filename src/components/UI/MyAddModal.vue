<script setup>
import { computed, defineEmits, onMounted, ref, watch } from 'vue'
import { useParameters } from '@/stores/parameters.js'
import MyMapForm from '@/components/Forms/MyMapForm.vue'

const emit = defineEmits(['saveReserveData'])

const reserve = ref({
  region: null,
  city: null,
  x: null,
  y: null,
});
const img = ref([])

const parameters = useParameters()
const regions = computed(() => parameters.regions)
const cities = computed(() => parameters.cities)
const states = computed(() => parameters.states)
const categories = computed(() => parameters.categories)
const types = computed(() => parameters.types)
const purposes = computed(() => parameters.purposes)

onMounted(() => {
  parameters.fetchParameters()
})

const emitReserveData = () => {
  emit('saveReserveData', reserve.value, img.value)
  Object.keys(reserve.value).forEach(key => {
    if (typeof reserve.value[key] === 'object') {
      reserve.value[key] = {};
    } else {
      reserve.value[key] = '';
    }
  });
  img.value = []
}

const handleFileUpload = (event) => {
  img.value = Array.from(event.target.files);
}

watch(
  () => reserve.value.region,
  (newRegion) => {
    if (newRegion) {
      parameters.fetchCities(newRegion.id);
      reserve.value.city = null;
    }
  }
);
</script>

<template>
  <div class="modal fade" id="reserveEditModal" tabindex="-1" aria-labelledby="reserveAddModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reserveAddModalLabel">Добавить заповедник</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-4">
            <div class="mb-3">
              <label for="name" class="form-label">Название</label>
              <input type="text" id="name" v-model="reserve.name" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Описание</label>
              <textarea rows="3" id="description" v-model="reserve.description" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="select_region" class="form-label">Регион</label>
              <select class="border rounded-3 p-2 d-flex w-25" v-model="reserve.region" id="select_region">
                <option selected disabled value="">Выберите регион</option>
                <option v-for="region in regions" :value="region" :key="region.id">{{ region.name }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="select_city" class="form-label">Город</label>
              <select class="border rounded-3 p-2 d-flex w-25" v-model="reserve.city" id="select_city">
                <option selected disabled value="">Выберите город</option>
                <option v-for="city in cities" :value="city" :key="city.id">{{ city.name }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="date" class="form-label">Дата основания</label>
              <input type="date" id="date" v-model="reserve.dataCreate" class="form-control w-25" value=""/>
            </div>

            <div class="mb-3">
              <label for="select_category" class="form-label">Категория</label>
              <select class="border rounded-3 p-2 d-flex w-25" v-model="reserve.category" id="select_category">
                <option selected disabled value="">Выберите категорию</option>
                <option v-for="category in categories" :value="category" :key="category.id">{{ category.name }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="select_state" class="form-label">Состояние</label>
              <select class="border rounded-3 p-2 d-flex w-25" v-model="reserve.state" id="select_state">
                <option selected disabled value="">Выберите состояние</option>
                <option v-for="state in states" :value="state" :key="state.id">{{ state.name }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="select_type" class="form-label">Тип</label>
              <select class="border rounded-3 p-2 d-flex w-25" v-model="reserve.type" id="select_type">
                <option selected disabled value="">Выберите тип</option>
                <option v-for="type in types" :value="type" :key="type.id">{{ type.name }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="select_purpose" class="form-label">Цель</label>
              <select class="border rounded-3 p-2 d-flex w-25" v-model="reserve.purpose" id="select_purpose">
                <option selected disabled value="">Выберите цель</option>
                <option v-for="purpose in purposes" :value="purpose" :key="purpose.id">{{ purpose.name }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="department" class="form-label">Департамент</label>
              <input type="text" id="department" v-model="reserve.department" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="countCluster" class="form-label">Количество кластеров</label>
              <input type="text" id="countCluster" v-model="reserve.countCluster" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="size" class="form-label">Размер</label>
              <input type="text" id="size" v-model="reserve.size" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="guardedSize" class="form-label">Охраняемый размер</label>
              <input type="text" id="guardedSize" v-model="reserve.guardedSize" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="mail" class="form-label">Почта</label>
              <input type="text" id="mail" v-model="reserve.mail" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="supervisor" class="form-label">Руководитель</label>
              <input type="text" id="supervisor" v-model="reserve.supervisor" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label">Телефон</label>
              <input type="tel" id="phone" v-model="reserve.phone" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Электронная почта</label>
              <input type="email" id="email" v-model="reserve.email" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="link" class="form-label">Ссылка</label>
              <input type="url" id="link" v-model="reserve.link" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="img" class="form-label">Изображения</label>
              <input type="file" multiple id="img" @change="handleFileUpload" class="form-control" value=""/>
            </div>

            <div class="mb-3">
              <label for="x" class="form-label">Выберите место на карте:</label>
              <MyMapForm
                v-model:x="reserve.x"
                v-model:y="reserve.y"
              />
              <div>
                <label>Текущие координаты:</label>
                <p>x : {{ reserve.x }} y : {{ reserve.y }}</p>
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="emitReserveData">Сохранить</button>
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
