<template>
  <div class="charger-card">
    <div class="card-header">
      <h3>{{ charger.name }}</h3>
      <div class="actions">
        <button @click="$emit('edit', charger)" class="edit-btn">✏️</button>
        <button @click="$emit('delete', charger._id)" class="delete-btn">🗑️</button>
      </div>
    </div>

    <div class="card-body">
      <p :class="['status', charger.status  === 'Active' ? 'Active' : 'Inactive']">
        🟢 <strong>Status:</strong> {{ charger.status  === 'Active' ? 'Active' : 'Inactive'  }}
      </p>
      <p>⚡ <strong>Power Output:</strong> {{ charger.powerOp }} kW</p>
      <p>🔌 <strong>Connector Type:</strong> {{ charger.connectorType }}</p>
      
      <p>📍 <strong>Location:</strong> {{ charger.location.latitude }}, {{ charger.location.longitude }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  charger: Object
})
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.charger-card {
  background: #eeecec;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
  transition: box-shadow 0.3s ease;
}

.charger-card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.actions button {
  background: none;
  border: none;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.actions button:hover {
  opacity: 0.7;
}

.card-body p {
  margin: 0.3rem 0;
}

.status.Active {
  color: green;
}
.status.Inactive {
  color: red;
}

.edit-btn {
  color: #007bff;
}

.delete-btn {
  color: #dc3545;
}
</style>
