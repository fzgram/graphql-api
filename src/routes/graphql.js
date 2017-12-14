// @flow
// https://github.com/amazeeio/lagoon/blob/master/services/api/src/routes/graphql.js
const graphql = require("express-graphql");
const schema = require("../schema");

const graphqlRoute = graphql({
  graphiql: process.env.NODE_ENV === "development",
  pretty: true,
  schema,
});

module.exports = [graphqlRoute];
