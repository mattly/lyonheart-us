import React from 'react'
import { graphql } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { cx } from 'emotion'

import Article from './article'
import Layout from './layout'
import shortcodes from './shortcodes'

export default function ArticleTemplate({ data: { mdx } }) {
    const articleClass = cx({
        hasAsides: !mdx.frontmatter.pageWidth
    })
    return (
        <Layout>
            <main>
                <Article width={mdx.frontmatter.pageWidth} className={articleClass}>
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