export const formatResult = (result: number | string) => {
  const formattedResult = Number.isInteger(result)
    ? Number(result)
    : Math.round(Number(result) * 100) / 100

  return formattedResult.toLocaleString('en-US')
}
