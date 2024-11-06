<script setup lang="ts">
import {
  YandexMap,
  YandexMapDefaultFeaturesLayer, YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer
} from 'vue-yandex-maps'
import { LngLat } from '@yandex/ymaps3-types';
import { shallowRef, triggerRef } from 'vue'
import { YMapDefaultMarker} from '@yandex/ymaps3-types/packages/markers'

const marker = shallowRef<YMapDefaultMarker | null>(null);
const center = <LngLat> [37.617644, 55.755819];
const emit = defineEmits(['update:x', 'update:y']);

const onDragMove = () => {
  triggerRef(marker);
  console.log(marker.value.coordinates);
  emit('update:x', marker.value.coordinates[1]);
  emit('update:y', marker.value.coordinates[0]);
}
</script>

<template>
  <yandex-map
    height="700px"
    :settings="{
        location: {
            center,
            zoom: 5,
        },
    }"
  >
    <yandex-map-default-scheme-layer/>
    <yandex-map-default-features-layer/>
    <yandex-map-default-marker
      v-model="marker"
      :settings="{
            coordinates: marker?.coordinates || center,
            title: marker?.coordinates
              ? `Широта: ${marker.coordinates[1].toFixed(2)}<br>Долгота: ${marker.coordinates[0].toFixed(2)}`
              : 'Инициализация...',
            draggable: true,
            onDragMove,
        }"
    />
  </yandex-map>
</template>
