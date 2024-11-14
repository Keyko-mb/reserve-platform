<script setup lang="ts">
import {
  YandexMap, YandexMapControls,
  YandexMapDefaultFeaturesLayer, YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer, YandexMapZoomControl
} from 'vue-yandex-maps'
import { shallowRef, triggerRef } from 'vue'

/**
 * @typedef {import('@yandex/ymaps3-types').LngLat} LngLat
 */
const props = defineProps({
  x: { type: Number, default: 37.617644 }, // например, Москва
  y: { type: Number, default: 55.755819 }, // например, Москва
});

/** @type {import('vue').ShallowRef<YMapDefaultMarker | null>} */
const marker = shallowRef(null);
const center =/** @type {LngLat} */ [props.y, props.x];
const emit = defineEmits(['update:x', 'update:y']);

const onDragMove = () => {
  triggerRef(marker);
  emit('update:x', marker.value.coordinates[1]);
  emit('update:y', marker.value.coordinates[0]);
}
</script>

<template>
  <div>
    <yandex-map
      height="700px"
      :settings="{
        location: {
            center,
            zoom: 5,
        },
      }">
      <yandex-map-default-scheme-layer/>
      <yandex-map-default-features-layer/>
      <yandex-map-controls :settings="{ position: 'right' }">
        <yandex-map-zoom-control/>
      </yandex-map-controls>
      <yandex-map-default-marker
        v-model="marker"
        :settings="{
            coordinates: marker?.coordinates || center,
            title: marker?.coordinates
            ? `Широта: ${marker.coordinates[1] ? marker.coordinates[1].toFixed(2) : 'Не определена'}<br>Долгота: ${marker.coordinates[0] ? marker.coordinates[0].toFixed(2) : 'Не определена'}`
            : 'Инициализация...',
          draggable: true,
          onDragMove,
          }"
      />
    </yandex-map>
  </div>
</template>
