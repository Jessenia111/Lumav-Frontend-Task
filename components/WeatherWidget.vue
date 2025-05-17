<template>
    <div :class="['weather-box', weatherClass]">
      <div class="weather-info">
        <div class="location-bar">
          <button @click="prevCity">←</button>
          <h2>{{ currentCity }}</h2>
          <button @click="nextCity">→</button>
          <button class="add-button" @click="addCity">+</button>
        </div>
        <div v-if="weather">
          <p>{{ weather.temperature }}°C</p>
          <p>{{ weather.condition }}</p>
        </div>
        <div v-else>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted, computed, watch } from 'vue'

const cities = ref(['Tallinn', 'London', 'Tokyo'])
const currentIndex = ref(0)
const currentCity = computed(() => cities.value[currentIndex.value])
const weather = ref(null)

const fetchWeather = async () => {
  try {
    const res = await fetch(`/api/weather?city=${encodeURIComponent(currentCity.value)}`)
    weather.value = await res.json()
  } catch (err) {
    console.error('Failed to fetch weather data:', err)
  }
}

watch(currentCity, fetchWeather)
onMounted(fetchWeather)

const nextCity = () => {
  currentIndex.value = (currentIndex.value + 1) % cities.value.length
}

const prevCity = () => {
  currentIndex.value = (currentIndex.value - 1 + cities.value.length) % cities.value.length
}

const addCity = () => {
  const newCity = prompt('Enter city name:')
  if (newCity && !cities.value.includes(newCity)) {
    cities.value.push(newCity.trim())
    currentIndex.value = cities.value.length - 1
  }
}

const weatherClass = computed(() => {
  if (!weather.value) return ''
  const condition = weather.value.condition.toLowerCase()
  if (condition.includes('clear')) return 'clear'
  if (condition.includes('cloud')) return 'cloudy'
  if (condition.includes('rain')) return 'rainy'
  if (condition.includes('snow')) return 'snowy'
  return 'default'
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap');

.weather-info {
  font-family: 'Roboto Mono', monospace;
  width: 60%;
  max-width: 600px;
  min-width: 280px;
  background-color: rgba(9, 10, 22, 0.4);
  padding: 30px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 16px rgba(9, 10, 22, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.location-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.location-bar button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.add-button {
  margin-left: auto;
  font-size: 20px;
}

.weather-box {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  color: white;
  font-size: 18px;
  transition: background 0.3s ease;
}

.clear {
  background-image: url('/images/sunny.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.cloudy {
  background-image: url('/images/Cloudy.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.rainy {
  background-image: url('/images/Rainy.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.snowy {
  background-image: url('/images/Snowy.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

</style>
