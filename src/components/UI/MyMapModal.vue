<script setup lang="ts">
import {
  YandexMap,
  YandexMapControls, YandexMapDefaultFeaturesLayer, YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
  YandexMapZoomControl
} from 'vue-yandex-maps'
import { LngLat } from '@yandex/ymaps3-types';
import { ref, watch } from 'vue'

const props = defineProps(['title', 'x', 'y'])

const marker = ref({
  title: props.title,
  coordinates: <LngLat> [props.y, props.x],
})

watch(() => [props.y, props.x], ([newY, newX]) => {
  marker.value.coordinates = [newY, newX];
});
</script>

<template>
  <div class="modal fade" id="reserveEditModal" tabindex="-1" aria-labelledby="reserveMapModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reserveMapModalLabel">Местоположение</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <yandex-map
            height='700px'
            :settings="{
              location: {
                center: marker.coordinates,
                zoom: 5,
              },
            }">
            <yandex-map-default-scheme-layer/>
            <yandex-map-default-features-layer/>
            <yandex-map-controls :settings="{ position: 'right' }">
              <yandex-map-zoom-control/>
            </yandex-map-controls>
            <yandex-map-default-marker
              :settings="{
                coordinates: marker.coordinates,
                title: marker.title,
                subtitle: `Широта: ${ marker.coordinates[1].toFixed(2) }<br>Долгота: ${ marker.coordinates[0].toFixed(2) }`,
              }"
            />
          </yandex-map>
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
