import { Place } from './interfaces'

const LS_KEY = 'place'

export const DEFAULT_LOCATION = {
  latitude: 47.606209,
  longitude: -122.332069,
}

export const getSavedPlace = (): Place | undefined => {
  const saved = localStorage.getItem(LS_KEY)
  if (!(saved && saved.length)) return
  return JSON.parse(saved)
}

export const setSavedPlace = (place: Place): void => {
  localStorage.setItem(LS_KEY, JSON.stringify(place))
}

export const clearSavedPlace = (): void => {
  localStorage.removeItem(LS_KEY)
}
