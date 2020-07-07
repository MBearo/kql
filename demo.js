const { esQuery } = require('./index')
esQuery(
  'http://fex.lehe.com/api/es/_mget',
  "index-pattern:268bf770-bab7-11ea-9986-e757f47a9416",
  "content._kind : request",
  "2020-07-03T05:58:10.472Z",
  "2020-07-03T06:13:10.472Z"
)
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })