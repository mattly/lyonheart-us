import PropTypes from "prop-types"
import styled from "@emotion/styled"

import { spacing, asideContainer, type } from "./molecules"

const Section = styled.section(
  {
    display: "grid",
    gridTemplateColumns: "100%",
    columnGap: spacing.md,
    rowGap: spacing.md,

    "& p, & > li, & > ol": {
      marginTop: 0,
      marginBottom: 0,
    },
    "& > li, & > ol": {
      paddingLeft: spacing.md,
      p: {
        marginTop: 0,
        marginBottom: spacing.sm,
      },
      '& li:last-child p': {
        marginBottom: 0,
      }
    },

    '.hasAsides &': asideContainer,
  },
  (props) => {
    const articleLead = props.articleLead && {
      marginTop: spacing.md,
      marginBottom: spacing.md,
    }
    const leadingThought = props.leadingThought && {
      '& > p:first-of-type': {
        '&::first-line': { ...type.LeadingThought },
        '& + aside': {
          marginTop: spacing.lg1,
        }
      }
    }
    const rule = props.rule && {
      '&::before': {
        display: 'block',
        content: '" "',
        marginTop: '-1px',
        borderTop: '1px dotted',
        marginBottom: spacing.sm,
      }
    }
    return {
      ...articleLead,
      ...(props.hasAsides ? asideContainer : {}),
      ...leadingThought,
      ...rule,
    }
  }
)
Section.propTypes = {
  articleLead: PropTypes.bool,
  children: PropTypes.node.isRequired,
  hasAsides: PropTypes.bool,
  leadingThought: PropTypes.bool,
  rule: PropTypes.bool,
}

export default Section
