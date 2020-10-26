
export const font = {
    family: {
        sans: 'sans-serif;',
    },
    size: {
        sm1: "0.75rem",
        md:  "1rem",
        lg4: "2.25rem",
    },
    weight: {
        normal: 400,
        semibold: 600,
        bold: 700,
    }
}

export const type = {
    font: {
        family: font.family, ...font.family,
        size: font.size, ...font.size,
        weight: font.weight, ...font.weight,
    },
    leading: {
        tight: '1.15rem',
        normal: '1.66rem',
        title: '2.25rem',
    },
}

export const spacing = {
    smX: '0.5rem',
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
    fullBleed: {
        gridColumn: '1 / -1',
    },
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