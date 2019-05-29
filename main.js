window.addEventListener('load', () => {
  let long
  let lat
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  )
  let temperatureDegree = document.querySelector('.temperature-degree')
  let locationTimezone = document.querySelector('.location-timezone')
  let temperatureSection = document.querySelector('.temperature-section')
  let temperatureSpan = document.querySelector('.temperature-section span')
  let celcius
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude
      lat = position.coords.latitude
      const proxy = `https://cors-anywhere.herokuapp.com/`
      const api = `${proxy}https://api.darksky.net/forecast/43f064e888fa2efdd1bffbe954b623ca/${lat},${long}`
      fetch(api)
        .then(response => {
          return response.json()
        })
        .then(data => {
          const { temperature, summary, icon } = data.currently
          temperatureDegree.textContent = temperature
          temperatureDescription.textContent = summary
          locationTimezone.textContent = data.timezone
          celcius = (temperature - 32) * (5 / 9)
          setIcons(icon, document.querySelector('.icon'))
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C'
              temperatureDegree.textContent = Math.floor(celcius)
            } else {
              temperatureSpan.textContent = 'F'
              temperatureDegree.textContent = temperature
            }
          })
        })
    })
  } else {
    console.log('Allow Location')
  }
  function setIcons (icon, iconId) {
    const skycons = new Skycons({ color: 'white' })
    const currentIcon = icon.replace(/-/g, '_').toUpperCase()
    skycons.play()
    return skycons.set(iconId, Skycons[currentIcon])
  }
})
