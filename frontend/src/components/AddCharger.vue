<template>
  <div v-if="visible" class="modal">
    <div class="modal-content">
      <h3>Add New Charger</h3>
      <form @submit.prevent="handleSubmit">
        <label>Name: <input v-model="charger.name" required /></label>
        <label>Power Output (kW): <input type="number" v-model.number="charger.powerOp" required /></label>
        <label>Connector Type:
          <select v-model="charger.connectorType" required>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
          </select>
        </label>
        <label>Status:
          <select v-model="charger.status" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <label>Latitude: <input type="number" step="any" v-model.number="charger.location.latitude" required /></label>
        <label>Longitude: <input type="number" step ="any" v-model.number="charger.location.longitude" required /></label>

        <button type="submit">Add</button>
        <button type="button" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add', 'close'])
const props = defineProps({ visible: Boolean })

const charger = ref({
  name: '',
  powerOp: 0,
  connectorType: '',
  status: 'available',
  location: { latitude: 0, longitude: 0 }
})

const handleSubmit = () => {
  emit('add', charger.value)
  charger.value = {
    name: '',
    powerOp: 0,
    connectorType: '',
    status: 'available',
    location: { latitude: 0, longitude: 0 }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index:9998
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
}
form label {
  display: block;
  margin: 0.5rem 0;
}
form input, form select {
  width: 100%;
  padding: 0.4rem;
  margin-top: 0.2rem;
}
</style>
