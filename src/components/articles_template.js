import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Article from './article'
import Layout from './layout'
import shortcodes from './shortcodes'

export default function ArticleTemplate({ data: { mdx } }) {
    return (
        <Layout>
            <main>
                <Article width={mdx.frontmatter.pageWidth}>
                    <MDXProvider components={shortcodes}>
                        <MDXRenderer {...mdx} {...mdx.frontmatter}>{mdx.body}</MDXRenderer>
                    </MDXProvider>
                </Article>
            </main>
        </Layout>
    )
}


export const pageQuery = graphql`
query Article($id: String) {
    mdx(id: { eq: $id }) {
        body
        frontmatter {
            title
            date
            pageWidth
        }
    }
}
`