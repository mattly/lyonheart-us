curl -H "Authorization: bearer $TOKEN" -X POST -d "\
{ \"query\": \
  \"query { \
      viewer { \
        repositories { totalCount }}}\"}" \
https://api.github.com/graphql
