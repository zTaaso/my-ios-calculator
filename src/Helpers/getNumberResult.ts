export const getNumberResult = (result: string) => {
  if (result.includes(',')) {
    return Number(result.replace(/,/g, ''))
  }

  return Number(result)
}
