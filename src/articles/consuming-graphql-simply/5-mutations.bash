curl -H "Authorization: bearer $TOKEN" -X POST -d "\
{ \"query\": \
  \"mutation StarRepo(\$id: ID!) { \
      addStar(input: {starrableId: \$id}) { \
        starrable { \
          ... on Repository { name } \
          viewerHasStarred
          stargazers { totalCount }}}}}\",
  \"variables\": \
  {\"id\": \"MDEwOlJlcG9zaXRvcnkxMDg4OTA0MA==\"}}" \
https://api.github.com/graphql
