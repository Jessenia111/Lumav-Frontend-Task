export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiKey = config.weatherApiKey
    const city = 'Tallinn'
  
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    const data = await res.json()

    console.log('API result:', data) 

  if (!data.main || !data.weather) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid response from OpenWeather',
      data
    })
  }
  
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main
    }
  })
  