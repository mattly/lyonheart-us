import tsv from  'tsv'
import { sum, max, rollup } from 'd3-array'

const findByName = name => ({ relativePath }) => name === relativePath

const cleanRow = row => {
  const out = {}
  out.years = {}
  Object.keys(row).forEach(k => {
    const key = k.trim()
    const val = row[k] || ""
    if (key === "Admitted") {
      out.admitted = val
    } else if (key === "Name") {
      out.name = val.trim()
    } else {
      if (typeof val === "number") {
        out.years[key] = val
      } else {
        out.years[key] = val.trim() === "" ? 0 : parseInt(val.replace(/,/g, ""))
      }
    }
  })
  return out
}

const parseFile = (siblings, name) => {
  const sibling = siblings.find(findByName(name))
  if (!sibling) { return [] }
  return tsv.parse(sibling.contents).map(cleanRow)
}

const reduceStateRows = (stateInfo) =>  (out, {name, years}) =>
  out.concat(
    Object.keys(years).map(year => ({
      name, year,
      total: years[year],
      enslaved: 0,       // these will be
      free: years[year], // overwritten if needed
      represented: stateInfo[name] && stateInfo[name].isState && stateInfo[name].admitted <= year,
    }))
  )

const reconciler = (siblings) => {
  const states = siblings.find(findByName('apportionment/states.txt')).contents.split('\n')

  const start = parseFile(siblings, 'apportionment/uspop-1790-1860.tsv')

  const stateInfo = {}
  start.forEach(({ name, admitted }) => {
    stateInfo[name] = { admitted, isState: states.indexOf(name) > -1 }
  })
  const popReducer = reduceStateRows(stateInfo)

  let population = start.reduce(popReducer, [])
  population = parseFile(siblings, 'apportionment/uspop-1870-1950.tsv').reduce(popReducer, population)
  population = parseFile(siblings, 'apportionment/uspop-1960-2010.tsv').reduce(popReducer, population)
  population.forEach(({ name }) => {
    if (!stateInfo[name]) {
      stateInfo[name] = { isState: false }
    }
  })

  parseFile(siblings, 'apportionment/enslavedpop-1790-1860.tsv').forEach(
    ({ name, years }) => {
      Object.keys(years).forEach(year => {
        const fact = population.find(d => d.name === name && d.year === year)
        if (!fact) {
          console.error(`could not find matching datum for ${name}:${year}`)
        } else {
          fact.enslaved = years[year]
          fact.free = fact.total - years[year]
        }
      })
    })

  const byCensus = rollup(population, v => {
    const allTotal = v.map(r => r.total)
    const free = v.map(r => r.free)
    const representedFree = v.filter(r => r.represented).map(r => r.free)
    return ({
      allSum: sum(allTotal),
      allMax: max(allTotal),
      freeSum: sum(free),
      repFreeSum: sum(representedFree),
    })
  }, r => r.year)

  return {
    stateInfo,
    population,
    byCensus,
  }
}

export default {
  reconciler
}