<template>
    <div :class="['weather-box', weatherClass]">
      <h2>Weather in Tallinn</h2>
      <div v-if="weather">
        <p>Temperature: {{ weather.temperature }}°C</p>
        <p>Condition: {{ weather.condition }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  
  const weather = ref(null)
  
  const fetchWeather = async () => {
    try {
      const res = await fetch('/api/weather')
      weather.value = await res.json()
    } catch (err) {
      console.error('Failed to fetch weather data:', err)
    }
  }
  
  onMounted(fetchWeather)
  
  const weatherClass = computed(() => {
    if (!weather.value) return ''
    const condition = weather.value.condition.toLowerCase()
  
    if (condition.includes('clear')) return 'sunny'
    if (condition.includes('cloud')) return 'cloudy'
    if (condition.includes('rain')) return 'rainy'
    if (condition.includes('snow')) return 'snowy'
    return 'default'
  })
  </script>
  
  <style scoped>
  .weather-box {
    padding: 20px;
    border-radius: 12px;
    color: white;
    text-align: center;
    margin-top: 40px;
    font-size: 18px;
    transition: background 0.3s ease;
  }
  
  .sunny {
    background: linear-gradient(to right, #f9d423, #ff4e50);
  }
  .cloudy {
    background: linear-gradient(to right, #bdc3c7, #2c3e50);
  }
  .rainy {
    background: linear-gradient(to right, #4b79a1, #283e51);
  }
  .snowy {
    background: linear-gradient(to right, #e6dada, #274046);
  }
  .default {
    background: gray;
  }
  </style>
  