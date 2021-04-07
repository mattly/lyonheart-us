import React from "react"
import styled from "@emotion/styled"
import { css } from "emotion"
import { max, sort } from "d3-array"
import { scaleLinear } from "d3-scale"

import { type, escapeAsideContainer } from "../../../components/molecules"

const Container = styled.div({
  // display: 'grid',
  // gridTemplateColumns: '140px 1fr'
  ...escapeAsideContainer,
})

const rowHeight = 16

const Label = styled.text(
  {
    height: `${rowHeight}px`,
    fontFamily: type.sans,
    fontSize: "14px",
    fill: "var(--color-fg)",
  },
  ({ anchor = "end" }) => ({
    textAnchor: anchor,
  })
)

export const colors = {
  represented: "color-fg",
  unrepresented: "color-fg-blue",
  enslaved: "color-fg-violet",
}

const YearLegend = ({ years, scale, width, height }) => (
  <g transform="translate(0,16)">
    {years.map((year, idx) =>
      (idx + 4) % 4 == 0 ? (
        <g key={year}>
          <Label y="13" x={scale(idx) + width * 3}>
            {year}
          </Label>
          <rect
            y="15"
            height="2"
            x={scale(idx)}
            width="1"
            fill="var(--color-fg)"
          />
          <rect
            y="15"
            height={height - 15}
            x={scale(idx)}
            width="1"
            fill="var(--color-bg-x)"
          />
        </g>
      ) : null
    )}
  </g>
)

const handleMouseOver = event => {
  console.log(event.target)
}

export const Chart1 = ({ data }) => {
  const names = Object.keys(data.stateInfo).sort()
  const years = Array.from(data.byCensus.keys()).sort()

  const maxAreaAllPop = max(
    Array.from(data.byCensus.values()).map(({ allMax }) => allMax)
  )

  const nameWidth = 140
  const yearWidth = 11
  const yearsWidth = years.length * yearWidth
  const rowGap = 2
  const chartGap = yearWidth * 2
  const binOffset = nameWidth + yearsWidth + chartGap
  const legendOffset = binOffset + yearsWidth + chartGap
  const totalWidth = binOffset + yearsWidth
  const totalHeight = rowHeight * names.length + 36

  const popAllH = scaleLinear()
    .domain([0, maxAreaAllPop])
    .range([0, rowHeight - rowGap])
  const yearAllXscale = yearIdx => nameWidth + yearIdx * yearWidth

  const yearBinXscale = yearIdx => binOffset + yearIdx * yearWidth

  return (
    <Container id="chart1">
      <div>
        <svg width="500" height="15">
          <rect
            x="0"
            y="5"
            height="9"
            width="14"
            fill={`var(--${colors.represented})`}
          />
          <Label anchor="start" x="18" y="13">
            represented
          </Label>
          <rect
            x="120"
            y="5"
            height="9"
            width="14"
            fill={`var(--${colors.unrepresented})`}
          />
          <Label anchor="start" x="138" y="13">
            unrepresented
          </Label>
          <rect
            x="250"
            y="5"
            height="9"
            width="14"
            fill={`var(--${colors.enslaved})`}
          />
          <Label anchor="start" x="268" y="13">
            enslaved
          </Label>
        </svg>
      </div>
      <svg width={totalWidth} height={totalHeight}>
        <g>
          <Label x={binOffset - chartGap} y="13">
            Cumulative Populations
          </Label>
          <YearLegend
            years={years}
            scale={yearAllXscale}
            width={yearWidth}
            height={totalHeight}
          />
          <Label x={totalWidth} y="13">
            Period Proportions
          </Label>
          <YearLegend
            years={years}
            scale={yearBinXscale}
            width={yearWidth}
            height={totalHeight}
          />
        </g>
        <g transform="translate(0,32)" onMouseOver={handleMouseOver}>
          {names.map((name, yi) => (
            <g key={name} transform={`translate(0, ${yi * rowHeight})`}>
              <Label x={nameWidth - 5} y={rowHeight}>
                {name}
              </Label>
              {years.map((year, yearIdx) => {
                const { allMax } = data.byCensus.get(year)
                const fact = data.population.find(
                  d => d.year === year && d.name === name
                )
                if (!fact || fact.total === 0) {
                  return null
                }
                const sumHeight = popAllH(fact.free || fact.total)
                const binHeight = (fact.total / allMax) * (rowHeight - rowGap)
                const fill = fact.represented
                  ? colors.represented
                  : colors.unrepresented
                const enslAllH = popAllH(fact.enslaved || 0)
                const enslBinH = (fact.enslaved / allMax) * (rowHeight - rowGap)
                return (
                  <g key={year}>
                    <rect
                      y={rowHeight - sumHeight}
                      height={sumHeight}
                      x={yearAllXscale(yearIdx)}
                      width={yearWidth - 1}
                      fill={`var(--${fill})`}
                      data-year={year}
                    />
                    {fact.enslavedH > 0 && (
                      <rect
                        y={rowHeight - enslAllH}
                        height={enslAllH}
                        x={yearAllXscale(yearIdx)}
                        width={yearWidth - 1}
                        fill={`var(--${colors.enslaved})`}
                        data-year={year}
                      />
                    )}
                    <rect
                      y={rowHeight - binHeight}
                      height={binHeight}
                      x={yearBinXscale(yearIdx)}
                      width={yearWidth - 1}
                      fill={`var(--${fill})`}
                      data-year={year}
                    />
                    {fact.enslaved > 0 && (
                      <rect
                        y={rowHeight - enslBinH}
                        height={enslBinH}
                        x={yearBinXscale(yearIdx)}
                        width={yearWidth - 1}
                        fill={`var(--${colors.enslaved})`}
                        data-year={year}
                      />
                    )}
                  </g>
                )
              })}
            </g>
          ))}
        </g>
      </svg>
    </Container>
  )
}

const representedColors = [
  "gry-4", "gry-6"
]

export const Chart2 = ({ data }) => {
  const years = Array.from(data.byCensus.keys()).sort()
  const yearHeight = 18
  const yearGap = 2
  const rowHeight = yearHeight + yearGap
  const bodyHeight = rowHeight * years.length

  return (
    <Container>
      <svg width="1000" height={bodyHeight}>
        {years.map((year, yi) => {
          const { repFreeSum, enslavedSum, unrepFreeSum } = data.byCensus.get(year)
          const xScale = scaleLinear().domain([0, repFreeSum]).range([0,500])
          let census = data.population.filter(d => d.represented && d.year === year && d.total > 0)
          census = sort(census, d => d.free || d.total).reverse()
          const halfway = census.length / 2
          console.log(year, halfway)
          let start = 0
          return (
            <g transform={`translate(0, ${yi * rowHeight})`}>
              <Label x="50" y={yearHeight - 4}>{year}</Label>
              {census.map(({ free }, xi) => {
                const w = xScale(free)
                const x = start
                start = x + w
                const fill = representedColors[xi % representedColors.length]
                let half = false
                if (xi === halfway) {
                  half = x
                } else if (xi + 0.5 === halfway) {
                  half = x + w/2
                }
                return (
                  <g>
                    <rect y="0" height={yearHeight} x={x + 60} width={w} fill={`var(--${fill})`} />
                    {half && <rect y="0" height={yearHeight} x={half + 60} width={2} fill={`var(--color-fg)`} />}
                  </g>
                )
              })}
              <rect y="0" height={yearHeight}
                x={565}
                width={xScale(enslavedSum)}
                fill={`var(--${colors.enslaved})`}
              />
              <rect y="0" height={yearHeight}
                x={565 + xScale(enslavedSum)}
                width={xScale(unrepFreeSum)}
                fill={`var(--${colors.unrepresented})`}
              />
            </g>
          )
        })}
      </svg>
    </Container>
  )
}
