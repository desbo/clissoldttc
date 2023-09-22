// seasons run from october - april, with the "start year" for a season
// as the year it was in october that season.
export const seasonStartYear = date => {
  // data for a season is available from september,
  // so if the month is before september, return the previous
  // year as the season start year.
  if (date.getMonth() < 8) return date.getFullYear() - 1
  return date.getFullYear()
}

export const winterSeasonString = date => {
  const startYear = seasonStartYear(date)
  const endYear = startYear + 1
  return `Winter_${startYear.toString()}-${endYear.toString().slice(-2)}`
}
