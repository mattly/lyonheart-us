import React from "react"
import styled from '@emotion/styled'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { column } from '../components/molecules'

const Inner = styled.section({
  ...column.narrow,
})

const NotFoundPage = () => (
  <Layout width="narrow">
    <SEO title="404: Not found" />

    <Inner>
    <p>Haven't found what you're looking for? Sorry, I try to keep my links stable.
Try <a href="/">the homepage</a>. And then if you still haven't found what you're looking
for, join the club.</p>
    </Inner>

  </Layout>
)

export default NotFoundPage
