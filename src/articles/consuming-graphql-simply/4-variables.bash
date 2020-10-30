curl -H "Authorization: bearer $TOKEN" -X POST -d "\
{ \"query\": \
  \"query UserMostStarredRepos(\$user: String!) { \
      user(login: \$user) { \
        repositories( \
          first: 3, \
          orderBy: {field: STARGAZERS, direction: DESC}) \
        { nodes { name stargazers { totalCount }}}}}\",
  \"variables\": {\"user\": \"mattly\"}}" \
https://api.github.com/graphql
