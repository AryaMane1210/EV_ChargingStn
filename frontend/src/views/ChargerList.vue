<script setup>
import { ref, onMounted,computed } from 'vue'
import axios from 'axios'
import ChargerCard from '@/components/ChargerCard.vue'
import EditChargerModal from '@/components/EditCharger.vue'
import AddChargerModal from '@/components/AddCharger.vue'
import MapView from '@/components/MapView.vue'


const filters=ref({
  status: '',
  powerOp:'',
  connectorType: ''
})

const filterChargers= computed(()=>{
  return  chargers.value.filter(charger =>{
    const statusMatch= !filters.value.status || charger.status === filters.value.status
    const connectorMatch= !filters.value.connectorType || charger.connectorType === filters.value.connectorType

    let powerMatch= true
    if(filters.value.powerOp === '<50'){
      powerMatch=charger.powerOp < 50
    }else if(filters.value.powerOp === '50-100') {
      powerMatch = charger.powerOp >= 50 && charger.powerOp <= 100
    } else if (filters.value.powerOp === '>100') {
      powerMatch = charger.powerOp > 100
    }

    return statusMatch && connectorMatch && powerMatch
  })
})
const chargers = ref([])
const selectedCharger = ref(null)
const showModal = ref(false)

const handleEdit = (charger) =>{
  selectedCharger.value = charger
  showModal.value = true
}


const handleSaveEdit = async (updatedCharger) => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`http://localhost:5000/api/chargers/${updatedCharger._id}`, updatedCharger, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const index = chargers.value.findIndex(c => c._id === updatedCharger._id)
    if (index !== -1) {
      chargers.value = chargers.value.map(c =>
       c._id === updatedCharger._id ? { ...updatedCharger } : c
       )
       console.log('Updated chargers list:', chargers.value)

    }
    showModal.value = false
  } catch (err) {
    console.error('Error updating charger:', err)
  }
}
const handleDelete = async(id)=>{
    try{
        const token=localStorage.getItem('token')
        await axios.delete(`http://localhost:5000/api/chargers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    chargers.value= chargers.value.filter(c => c._id !== id)
    }catch(err){
        console.error('Error deleting charger:', err)
    }
}

const showAddModal = ref(false)

const handleAddCharger = async(newCharger)=>{
  try{
    const token = localStorage.getItem('token');
    // console.log('token:', token);
    console.log("newCharger from modal:", newCharger);

      const res= await axios.post('http://localhost:5000/api/chargers', newCharger,{
         headers: {
        Authorization: `Bearer ${token}`
      }
      });
      const fullRes = await axios.get(`http://localhost:5000/api/chargers/${res.data._id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
      chargers.value.push(fullRes.data);
      // chargers.value = [...chargers.value, res.data];
      showAddModal.value = false
      }catch (err) {
        console.error('Error adding charger:', err)
  }
}

const fetchChargers = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:5000/api/chargers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    chargers.value = res.data
  } catch (err) {
    console.error('Error fetching chargers:', err)
  }
}

onMounted(() => {
  fetchChargers()
})
</script>

<template>
  <div class="main-layout">
    <div class="left-panel">
  <div class="charger-list-page">
    <h2>All Onboarded Chargers</h2>
    <div class="filters-wrapper">
    <div class="filters">
  <label>Status:
    <select v-model="filters.status">
      <option value="">All</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>
  </label>

  <label>Power Output:
    <select v-model="filters.powerOp">
      <option value="">All</option>
      <option value="<50">Less than 50</option>
      <option value="50-100">50 to 100</option>
      <option value=">100">More than 100</option>
    </select>
  </label>

  <label>Connector Type:
    <select v-model="filters.connectorType">
      <option value="">All</option>
      <option value="Type 1">Type 1</option>
      <option value="Type 2">Type 2</option>
    </select>
  </label>
  <div class="add-button-wrapper">
  <button @click="showAddModal = true" class="add-charger-btn">➕ Add Charger</button>
  </div>
</div>
  <AddChargerModal
    :visible="showAddModal"
    @add="handleAddCharger"
    @close="showAddModal = false"
  />
</div>
    <div v-if="chargers.length === 0">No chargers found.</div>
    <div v-else class="charger-list">
      <ChargerCard
        v-for="charger in filterChargers"
        :key="charger._id"
        :charger="charger"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>
     <EditChargerModal
      v-if="showModal"
      :visible="showModal"
      :charger="selectedCharger"
      @save="handleSaveEdit"
      @close="showModal = false"
    />
  </div>
   </div>

  <div class="right-panel">
    <MapView :chargers="chargers" />
  </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  padding: 1rem;
  box-sizing: border-box;
  gap: 1rem;
}

.add-button-wrapper {
  margin-left: auto;
}



.left-panel {
  flex: 2;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
 
}



.right-panel {
  flex: 1;
  display:flex;
  height: 100%;
  min-width: 350px;
  background-color: #f5f7fa;;
  justify-content: center;
  align-items: flex-start;
  padding-top: 8rem; 
  padding-left: 2rem;
}

.charger-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
  overflow-y: auto;
  max-height: 80vh; 
  padding-bottom: 2rem;
}


.filters-wrapper {
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 2rem;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  background: #f5f7fa; /* soft background */
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  flex-wrap: wrap;
}

.filters {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  flex-grow: 1;
  min-width: 250px;
}

.filters label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

.filters select {
  margin-top: 0.3rem;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;
}

.filters select:hover,
.filters select:focus {
  border-color: #4caf50;
  outline: none;
}

.add-charger-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 1rem;
  white-space: nowrap;
  transition: background-color 0.3s ease;
  flex-shrink: 0; 
  
}

.add-charger-btn:hover {
  background-color: #45a049;
}

h2 {
  margin-bottom: 1rem;
  text-align: center;
}

@media (max-width: 1024px) {
  .main-layout {
    flex-direction: column;
  }

  .left-panel,
  .right-panel {
    width: 100%;
    max-width: 100%;
  }

  .charger-list {
    grid-template-columns: 1fr;
  }
}
</style>
