export const asserNever = (x: never): never => {
  throw new Error(`Unexpected value ${x}`)
}
