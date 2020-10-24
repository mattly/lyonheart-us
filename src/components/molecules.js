
export const font = {
    family: {
        sans: 'sans-serif;',
    },
    size: {
        sm1: "0.75rem",
        lg4: "2.25rem",
    }
}

export const type = {
    font,
    leading: {
        aside: '1.15rem',
        normal: '1.66rem'
    },
}

export const spacing = {
    md: '1rem',
}

const centerCol = width => `1fr min(${width}, calc(100% - ${spacing.md} - ${spacing.md})) 1fr`
const colBase = {
    display: 'grid',
    columnGap: spacing.md,
    '& > *': {
        gridColumn: 2,
    }
}

export const breakingWide = `@media screen and (min-width: 768px)`

export const column = {
    main: {
        ...colBase,
        gridTemplateColumns: centerCol('34rem'),
    },
    wide: {
        ...colBase,
        gridTemplateColumns: centerCol('45rem'),
    }
}

export const asideContainer = {
    [breakingWide]: {
        gridTemplateColumns: `1fr 12rem`,
        '& > *': { gridColumn: 1 },
        '& > aside': { gridColumn: 2 },
    }
}