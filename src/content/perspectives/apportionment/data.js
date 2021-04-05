import tsv from  'tsv'

const findByName = name => ({ relativePath }) => name === relativePath

const clean = row => {
  const out = {}
  out.years = {}
  Object.keys(row).forEach(k => {
    const key = k.trim()
    let val = row[k]
    if (key === "Admitted") {
      out[key] = val
    } else if (key === "Name") {
      out[key] = val.trim()
    } else {
      out.years[key] = val.trim() === "" ? 0 : parseInt(val.replace(",", ""))
    }
  })
  return out
}

const appendYears = (data, rows) =>
  rows.forEach(({ Name, years }) => {
    if (!data[Name]) { data[Name] = { years: {}}}
    Object.keys(years).forEach(year =>
      data[Name].years[year] = years[year])
  })





const reconciler = (siblings) => {
  const start = siblings.find(findByName('apportionment/uspop-1790-1860.tsv'))
  const data = tsv.parse(start.contents).map(clean).reduce(
    (out, { Name, Admitted, years }) => {
      out[Name] = { Admitted, years }
      return out
    }, {}
  )
  const mid = siblings.find(findByName('apportionment/uspop-1870-1950.tsv'))
  appendYears(data, tsv.parse(mid.contents).map(clean))
  const last = siblings.find(findByName('apportionment/uspop-1960-2010.tsv'))
  appendYears(data, tsv.parse(last.contents).map(clean))
  return data
}

export default {
  reconciler
}