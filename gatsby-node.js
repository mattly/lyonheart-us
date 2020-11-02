const fs = require("fs")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

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
  const result = await graphql(`query { allMdx { edges { node {
    id
    frontmatter { title date direct }
    fields { category path }
  }}}}`)
  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.path,
      component: path.resolve(`./src/components/${node.fields.category}_template.js`),
      context: { id: node.id, ...node.fields, ...node.frontmatter },
    })
  })
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    File: {
      contents: {
        type: "String",
        resolve: (source) => {
          return fs.readFileSync(source.absolutePath, { encoding: 'utf-8' })
        }
      },
    },
    Mdx: {
      next: {
        type: "Mdx",
        resolve: (source, args, context) => {
          const sourceParent = context.nodeModel.getNodeById({ id: source.parent })
          return context.nodeModel
            .getAllNodes({ type: "Mdx" })
            .filter(node => {
              const parent = context.nodeModel.getNodeById({ id: node.parent })
              return (parent.sourceInstanceName == sourceParent.sourceInstanceName)
            })
            .sort((a, b) => Date.parse(a.frontmatter.date) - Date.parse(b.frontmatter.date))
            .find(other => other.frontmatter.date > source.frontmatter.date)
        },
      },
      prev: {
        type: "Mdx",
        resolve: (source, args, context) => {
          const sourceParent = context.nodeModel.getNodeById({ id: source.parent })
          return context.nodeModel
            .getAllNodes({ type: "Mdx" })
            .filter(node => {
              const parent = context.nodeModel.getNodeById({ id: node.parent })
              return (parent.sourceInstanceName == sourceParent.sourceInstanceName)
            })
            .sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date))
            .find(other => other.frontmatter.date < source.frontmatter.date)
        },
      },
      images: {
        type: ["ImageSharp"],
        args: { pathMatching: `String` },
        resolve: (source, args, context, info) => {
          const sourceParent = context.nodeModel.getNodeById({ id: source.parent })
          if (sourceParent.relativeDirectory == "") { return [] }
          return context.nodeModel
            .getAllNodes({ type: "ImageSharp" })
            .filter(image => {
              const thisParent = context.nodeModel.getNodeById({ id: image.parent })
              const matchesParent = thisParent.relativePath.startsWith(sourceParent.relativeDirectory)
              let matchesArg = true
              if (matchesParent && args.pathMatching) {
                matchesArg = thisParent.relativePath.match(args.pathMatching)
              }
              return matchesParent && matchesArg
            })
        },
      },
      siblings: {
        type: ["File"],
        resolve: (source, args, context) => {
          const sourceParent = context.nodeModel.getNodeById({ id: source.parent })
          if (sourceParent.relativeDirectory == "") { return [] }
          return context.nodeModel
            .getAllNodes({ type: "File" })
            .filter(file => {
              if (file.relativePath == sourceParent.relativePath) { return false }
              const matchesParent = file.relativePath.startsWith(sourceParent.relativeDirectory)
              return matchesParent
            })
        },
      },
    },
  }
  createResolvers(resolvers)
}
