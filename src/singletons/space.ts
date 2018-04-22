import { Space } from 'src/singletons/interfaces'

const LS_KEY = 'space'

export const getSpace = (): Promise<Space> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const space = { latitude, longitude }
        setSavedSpace(space)
        resolve(space)
      },
      (e: PositionError) => {
        alert(e.message)
        reject(e)
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
