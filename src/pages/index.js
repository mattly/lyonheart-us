import React from "react"
import { graphql, Link } from "gatsby"
import styled from '@emotion/styled'

import Layout from "../components/layout"
import SEO from "../components/seo"
import { column, spacing, box, type, underlinedLink } from '../components/molecules'
import bannerImg from '../assets/home-banner.jpg'

const Banner = styled.div({
  backgroundImage: `url(${bannerImg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '600px',
  margin: '0 -10vw -365px'
})

const Home = styled.div({
  ...column.narrow,
})
const HomeInner = styled.div({
  backgroundColor: 'var(--color-bg)',
  margin: `0 calc(-1 * ${spacing.lg})`,
  padding: spacing.lg,
  borderRadius: box.radius.xlarge,
})

const HelloSection = styled.section({
  fontSize: type.lg1,
  a: underlinedLink,
})

const ListSection = styled.section({
  lineHeight: type.leading.normal,
  h2: {
    marginTop: spacing.md,
    marginBottom: 0,
    fontFamily: type.sans,
    fontSize: type.lg,
  },
  a: {
    color: 'var(--color-link)',
    textDecoration: 'none',
  },
  h3: {
    margin: 0,
    fontSize: type.md,
    fontWeight: type.normal,
  },
  '.source': {
    marginLeft: type.md,
    fontSize: type.md,
    fontStyle: 'italic',
  }
})

const IndexPage = ({data}) => {
  const {site, articles, talks} = data
  return (
    <Layout width="narrow">
      <SEO title="Home" />
      <Banner />
      <Home>
        <HomeInner>
          <HelloSection>
            <p>
              Matthew Lyon is making <a href="https://github.com/mattly">software</a>,
              visual art,
              music,
              and writing.
            </p>
          </HelloSection>
          <ListSection>
            <h2>Essays</h2>
            {articles.nodes.map(article => (
              <h3><Link key={article.path} to={article.path}>{article.context.title}</Link></h3>
            ))}
          </ListSection>
          <ListSection>
            <h2>Talks</h2>
            {talks.nodes.map(talk => (
              talk.context.direct ?
                <h3>
                  <a href={talk.context.direct}><h3></h3>{talk.context.title}</a>
                  <span className="source">youtube</span>
                </h3>
                :
                <h3>
                  <Link to={talk.path}>{talk.context.title}</Link>
                </h3>
            ))}
          </ListSection>
        </HomeInner>
      </Home>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
query {
  site {
    meta: siteMetadata { title author }
  }

  articles: allSitePage(
    filter: { context: { category: { eq: "articles" }} }
    sort: { fields: [context___date] order: [DESC] }
  ) { ...pages }

  talks: allSitePage(
    filter: { context: { category: { eq: "talks" }} }
    sort: { fields: [context___date] order: [DESC] }
  ) { ...pages }

}
fragment pages on SitePageConnection {
  nodes {
    path
    context { title date category direct }
  }
}
`