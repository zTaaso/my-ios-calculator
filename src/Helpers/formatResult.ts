export const formatResult = (result: number | string) => {
  let serializedResult = result

  if (typeof result === 'string') {
    serializedResult = result.includes(',') ? result.replace(/,/g, '') : result
  }

  const formattedResult = Number.isInteger(serializedResult)
    ? Number(serializedResult)
    : Math.round(Number(serializedResult) * 100) / 100

  return formattedResult.toLocaleString('en-US')
}
