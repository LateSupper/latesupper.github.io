function roundToThousandth(n) {
  return Math.round((n + Number.EPSILON) * 1000) / 1000
}

function randomInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}