import PropTypes from "prop-types"
import styled from "@emotion/styled"

import { spacing, asideContainer } from "./molecules"

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
  ({ articleLead, hasAsides }) => {
    const leadSection = articleLead && {
      marginTop: spacing.md,
      marginBottom: spacing.md,
    }
    return {
      ...leadSection,
      ...(hasAsides ? asideContainer : {}),
    }
  }
)
Section.propTypes = {
  articleLead: PropTypes.bool,
  children: PropTypes.node.isRequired,
  hasAsides: PropTypes.bool,
}

export default Section
