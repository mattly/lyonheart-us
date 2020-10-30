curl -H "Authorization: bearer $TOKEN" -X POST -d "\
{ \"query\": \
  \"query UserInfo(\$user: ID!) { \
      user(login: \$user) { \
        login name bio company location websiteUrl createdAt \
        repositories { totalCount } \
        viewerCanFollow viewerIsFollowing }}\", \
  \"variables\": {\"user\": \"mattly\"}}" \
https://api.github.com/graphql
