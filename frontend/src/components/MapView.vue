<template>
    <div class="map-container">
    <div id="map" class="map-box"></div>
  </div>
 
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';

const props = defineProps({
  chargers: Array 
});

const map = ref(null);
const markers = ref([]);

onMounted(() => {
  map.value = L.map('map').setView([20, 0], 2); 

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value);

  addMarkers();
});

function addMarkers() {

  markers.value.forEach(marker => map.value.removeLayer(marker));
  markers.value = [];

  props.chargers.forEach(charger => {
    const { latitude, longitude } = charger.location;
    const marker = L.marker([latitude, longitude]).addTo(map.value);
    marker.bindPopup(`
      <b>${charger.name}</b><br/>
      Power: ${charger.powerOp} kW<br/>
      Connector: ${charger.connectorType}<br/>
      Status: ${charger.status}
    `);
    markers.value.push(marker);
  });
}


watch(() => props.chargers, () => {
  if (map.value) addMarkers();
});
</script>

<style scoped>

#map{
    z-index:1;
    position: relative;

}
.map-container {
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
  border: 2px solid #ddd;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map-box {
  height: 400px;
  width: 100%;
}
</style>
