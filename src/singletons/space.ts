import { Space } from '~singletons/interfaces'

const LS_KEY = 'space'

const DEFAULT_LOCATION = {
  latitude: 47.606209,
  longitude: -122.332069,
}

export const getSpace = (): Promise<Space> =>
  new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const space = { latitude, longitude }
        setSavedSpace(space)
        resolve(space)
      },
      (e) => {
        alert(e.message + ', using default location (Seattle).')
        resolve(DEFAULT_LOCATION)
      },
    )
  })

export const getSavedSpace = (): Space | undefined => {
  const saved = window.localStorage.getItem(LS_KEY)
  if (!(saved && saved.length)) return
  const parts = saved.split(',')
  const latitude = Number(parts[0])
  const longitude = Number(parts[1])
  return { latitude, longitude }
}

export const setSavedSpace = (m: Space): void => {
  window.localStorage.setItem(LS_KEY, `${m.latitude},${m.longitude}`)
}

export const clearSavedSpace = (): void => {
  window.localStorage.removeItem(LS_KEY)
}
