<script setup>
import { computed, defineEmits, onMounted, ref } from 'vue'
import { useParameters } from '@/stores/parameters.js'
import MyMapForm from '@/components/Forms/MyMapForm.vue'

const props = defineProps({
  reserve: {
    type: Object
  }
})
const reserve = ref({ ...props.reserve });
const emit = defineEmits(['saveReserveData'])

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
  emit('saveReserveData', reserve.value)
}

</script>

<template>
  <div>
    <div class="mb-4">
      <div class="mb-3">
        <label for="name" class="form-label">Название</label>
        <input type="text" id="name" v-model="reserve.name" class="form-control" value=""/>
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Описание</label>
        <input type="text" id="description" v-model="reserve.description" class="form-control" value=""/>
      </div>

      <div class="mb-3">
        <label for="select_region" class="form-label">Регион</label>
        <select class="border rounded-3 p-2 d-flex" v-model="reserve.region" id="select_region">
          <option selected disabled value="">Выберите регион</option>
          <option v-for="region in regions" :value="region" :key="region.id">{{ region.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="select_city" class="form-label">Город</label>
        <select class="border rounded-3 p-2 d-flex" v-model="reserve.city" id="select_city">
          <option selected disabled value="">Выберите город</option>
          <option v-for="city in cities" :value="city" :key="city.id">{{ city.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="select_category" class="form-label">Категория</label>
        <select class="border rounded-3 p-2 d-flex" v-model="reserve.category" id="select_category">
          <option selected disabled value="">Выберите категорию</option>
          <option v-for="category in categories" :value="category" :key="category.id">{{ category.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="select_state" class="form-label">Состояние</label>
        <select class="border rounded-3 p-2 d-flex" v-model="reserve.state" id="select_state">
          <option selected disabled value="">Выберите состояние</option>
          <option v-for="state in states" :value="state" :key="state.id">{{ state.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="select_type" class="form-label">Тип</label>
        <select class="border rounded-3 p-2 d-flex" v-model="reserve.type" id="select_type">
          <option selected disabled value="">Выберите тип</option>
          <option v-for="type in types" :value="type" :key="type.id">{{ type.name }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="select_purpose" class="form-label">Цель</label>
        <select class="border rounded-3 p-2 d-flex" v-model="reserve.purpose" id="select_purpose">
          <option selected disabled value="">Выберите цель</option>
          <option v-for="purpose in purposes" :value="purpose" :key="purpose.id">{{ purpose.name }}</option>
        </select>
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
        <input type="email" id="mail" v-model="reserve.mail" class="form-control" value=""/>
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
        <label for="x" class="form-label">Выберите место на карте:</label>
        <MyMapForm
          v-model:x="reserve.coordinates.x"
          v-model:y="reserve.coordinates.y"
        />
        <div>
          <label>Текущие координаты:</label>
          <p>x : {{ reserve.coordinates.x }} y : {{ reserve.coordinates.y }}</p>
        </div>
      </div>
    </div>
    <button class="btn btn-success" @click="emitReserveData">Сохранить</button>
  </div>
</template>

