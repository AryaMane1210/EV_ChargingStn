<template>
  <div class="modal-overlay" v-if="visible">
    <div class="modal">
      <h3>Edit Charger</h3>
      <form @submit.prevent="submitEdit">
        <label>
          Name:
          <input v-model="form.name" required />
        </label>
        <label>
          Status:
          <select v-model="form.status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <label>
          Power Output (kW):
          <input v-model.number="form.powerOp" type="number" required />
        </label>
        <label>
          Connector Type:
          <input v-model="form.connectorType" required />
        </label>
        <div class="actions">
          <button type="submit">Save</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps(['visible', 'charger'])
const emit = defineEmits(['save', 'close'])

const form = reactive({
  name: '',
  status: '',
  powerOp: 0,
  connectorType: ''
})

watch(() => props.charger, (newVal) => {
  if (newVal) {
    form.name = newVal.name
    form.status = newVal.status
    form.powerOp = newVal.powerOp
    form.connectorType = newVal.connectorType
  }
}, { immediate: true })

const submitEdit = () => {
  emit('save', { ...form, _id: props.charger._id })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
}

.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
   z-index: 9999; 
  position: relative;
}

label {
  display: block;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  justify-content: space-between;
}
</style>
