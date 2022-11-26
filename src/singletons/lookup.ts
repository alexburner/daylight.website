import { useEffect, useState } from 'react'
import { Space } from './interfaces'

interface LookupResult {
  latitude: number // 47.708022
  longitude: number // -122.278749
  type: string // "address"
  distance: number // 0.02
  name: string // "10727 Durland Avenue Northeast"
  number: string // "10727"
  postal_code: string // "98125"
  street: string // "Durland Avenue Northeast"
  confidence: number // 0.8
  region: string // "Washington"
  region_code: string // "WA"
  county: string // "King County"
  locality: string // "Seattle"
  administrative_area: null
  neighbourhood: string // "Matthews Beach"
  country: string // "United States"
  country_code: string // "USA"
  continent: string // "North America"
  label: string // "10727 Durland Avenue Northeast, Seattle, WA, USA"
}

const API_URL = 'http://api.positionstack.com/v1'
const API_LOL = [
  'a',
  'c',
  'c',
  'e',
  's',
  's',
  '_',
  'k',
  'e',
  'y',
  '=',
  '2',
  '2',
  'e',
  'c',
  '9',
  '0',
  'd',
  '2',
  'f',
  '6',
  '2',
  '6',
  '3',
  '9',
  'd',
  '3',
  'e',
  '5',
  '3',
  '2',
  '6',
  '2',
  '6',
  '1',
  '3',
  '3',
  'a',
  'e',
  '3',
  '6',
  '6',
  '8',
].join('')

export const useSpaceLabel = (space: Space): string | undefined => {
  const [label, setLabel] = useState<string>()
  useEffect(() => {
    lookupCoordsLabel(space).then((l) => setLabel(l))
  }, [space])
  return label
}

const lookupCoordsLabel = async (space: Space): Promise<string | undefined> => {
  const results = await lookupCoords(space)
  const result = results[0]
  if (!result) return
  return [result.locality, result.region_code, result.country_code].join(', ')
}

const lookupCoords = async ({
  latitude,
  longitude,
}: Space): Promise<LookupResult[]> => {
  // Build request URL
  const url = `${API_URL}/reverse?${API_LOL}&query=${latitude},${longitude}`

  // Attempt local cache first
  const saved = localStorage.getItem(url)
  if (saved && saved.length) {
    return JSON.parse(saved)
  }

  // Fetch from API if no cache hit
  const response = await fetch(url, { referrerPolicy: 'unsafe-url' })
  const json = await response.json()
  const results = json.data ?? []

  // Cache locally
  localStorage.setItem(url, JSON.stringify(results))

  // All done
  return results
}
