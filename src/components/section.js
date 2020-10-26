import PropTypes from "prop-types"
import styled from "@emotion/styled"

import { spacing, asideContainer, type } from "./molecules"

const Section = styled.section(
  {
    paddingBottom: spacing.md,

    display: "grid",
    gridTemplateColumns: "100%",
    columnGap: spacing.md,
    rowGap: spacing.md,

    "& > *": {
      marginTop: 0,
      marginBottom: 0,
    },

    '.hasAsides &': asideContainer,
  },
  (props) => {
    console.log(props)
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
    let breaking = { }
    if (props.break === 'space') {
      breaking = {
        marginTop: spacing.lg1,
      }
    }
    return {
      ...articleLead,
      ...(props.hasAsides ? asideContainer : {}),
      ...leadingThought,
      ...breaking,
    }
  }
)
Section.propTypes = {
  articleLead: PropTypes.bool,
  break: PropTypes.string,
  children: PropTypes.node.isRequired,
  hasAsides: PropTypes.bool,
  leadingThought: PropTypes.bool,
}

export default Section
