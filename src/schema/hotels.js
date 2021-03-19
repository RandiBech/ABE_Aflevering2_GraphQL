// QueryType med fields. Fields med metoder indeholdende type, 
// args og resolver (resolver kalder ny metode fra utils med logikken)

import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    printSchema,
  } from 'graphql';