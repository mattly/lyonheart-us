const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, actions, getNode, ...rest }) => {
    const { createNodeField } = actions

    if (node.internal.type === "Mdx") {
        const slug = createFilePath({ node, getNode })
        const parent = getNode(node.parent)
        const category = parent.sourceInstanceName
        createNodeField({ name: "category", node, value: category })
        createNodeField({ name: "path", node, value: `/${category}${slug}` })
    }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
    const result = await graphql(`query{allMdx{edges{node{id fields {category path}}}}}`)
    if (result.errors) {
        reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
    }
    result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.path,
            component: path.resolve(`./src/components/${node.fields.category}_template.js`),
            context: { id: node.id },
        })
    })
}

exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        Mdx: {
            images: {
                type: ['ImageSharp'],
                args: { pathMatching: `String` },
                resolve: (source, args, context, info) => {
                    const sourceParent = context.nodeModel.getNodeById({ id: source.parent })
                    return context.nodeModel.getAllNodes({ type: 'ImageSharp' })
                        .filter(image => {
                            const thisParent = context.nodeModel.getNodeById({ id: image.parent })
                            if (thisParent.relativeDirectory == "") { return false }
                            const matchesParent = thisParent.relativePath.startsWith(sourceParent.relativeDirectory)
                            let matchesArg = true
                            if (matchesParent && args.pathMatching) {
                                matchesArg = thisParent.relativePath.match(args.pathMatching)
                            }
                            return matchesParent && matchesArg
                        })
                }
            }
        }
    }
    createResolvers(resolvers)
}