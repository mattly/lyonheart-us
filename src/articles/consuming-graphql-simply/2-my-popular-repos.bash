curl -H "Authorization: bearer $TOKEN" -X POST -d "\
{ \"query\": \
  \"query { \
    viewer { \
      repositories( \
        first: 3, \
        orderBy: {field: STARGAZERS, direction: DESC}) \
      { nodes { name }}}}\" }" \
https://api.github.com/graphql
