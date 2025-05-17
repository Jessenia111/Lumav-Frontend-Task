export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const apiKey = config.weatherApiKey
    const query = getQuery(event)
    const city = query.city || 'Tallinn'
  
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    const data = await res.json()
  
    if (!data.main || !data.weather) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid response from OpenWeather API',
        data,
      })
    }
  
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
    }
  })
  