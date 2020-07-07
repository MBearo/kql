const axios = require('axios')
const { buildEsQuery } = require('./kbn-es-query/target/server/index')


const esQuery = async (url, _id, query, gte, lte) => {
  const fieldsRes = await axios.post(url, {
    docs: [{ _id, _index: ".kibana" }]
  })
  const fieldsList = JSON.parse(fieldsRes.data.docs[0]._source["index-pattern"].fields)
  return buildEsQuery(
    {
      fields: fieldsList
    },
    [{
      language: "kuery",
      query
    }],
    [{
      range: {
        "@timestamp": {
          format: "strict_date_optional_time",
          gte,
          lte
        }
      }
    }],
    {}
  )
}
module.exports = {
  esQuery
}
