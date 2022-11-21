import { useEffect, useState } from 'react'
import { Space } from './interfaces'

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
    lookupSpaceLabel(space).then((result) => setLabel(result))
  }, [space])
  return label
}

const lookupSpaceLabel = async ({
  latitude,
  longitude,
}: Space): Promise<string | undefined> => {
  /**
   * Note TODO
   * API request forwards to HTTPS
   * Which, I gotta pay for
   * This seems to happen in Chrome by default?
   * Testing in Postman, it doesn't
   * Wtf
   */

  const url = `${API_URL}/reverse?${API_LOL}&query=${latitude},${longitude}`
  const response = await fetch(url, { referrerPolicy: 'unsafe-url' })
  const json = await response.json()

  console.log(json)

  if (json.data && json.data.results && json.data.results[0]) {
    return json.data.results[0].label
  }
}
