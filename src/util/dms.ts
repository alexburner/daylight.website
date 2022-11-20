import DmsCoordinates from 'dms-conversion'

export const getDmsStrings = (
  lat: number,
  long: number,
): { lat: string; long: string } => {
  const coords = new DmsCoordinates(lat, long)
  return {
    lat: dmsArrayToString(coords.dmsArrays.latitude),
    long: dmsArrayToString(coords.dmsArrays.longitude),
  }
}

const dmsArrayToString = (
  arr: DmsCoordinates['dmsArrays']['latitude'],
): string => `${arr[0]}°${arr[1]}′${Math.round(arr[2])}″ ${arr[3]}`
