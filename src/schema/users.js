// QueryType med fields. Fields med metoder indeholdende type, 
// args og resolver (resolver kalder ny metode fra utils med logikken)

import {
    GraphQLObjectType,
  } from 'graphql';


  //Denne skal også fordeles i mutation og queries
const QueryType = new GraphQLObjectType({
  name: 'QueryUser',
  fields: {
    registerUser: {
     
    },
    login: {

    },
    getAllUsers: {

    },
    getUser: {
      

    },
    upgradeUser: {

    }
  }
})

