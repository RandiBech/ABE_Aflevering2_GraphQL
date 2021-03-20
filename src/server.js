//meget af det fra app.js

//se også server.js fra d06i-mutations
import express from 'express';
import cors from 'cors';
import * as config from './config';
import mongooseApiWrapper from './db/mongoose-api.js';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema';
import DataLoader from 'dataloader'; 

async function main() {
    const mongooseApi = await mongooseApiWrapper();
    const server = express();
    server.use(cors());
    server.use(express.urlencoded({ extended: false }));
    server.use(express.json());
    server.use('/:fav.ico', (req, res) => res.sendStatus(204));

    server.use('/graphql', (req, res) =>{
<<<<<<< HEAD
      const loaders = {
        // hotels: new DataLoader((hotelIds) => mongooseApi.getHotelFromId(hotelIds)),
        ...mongooseApi.queries,
      };
=======
>>>>>>> 9f7921da0b29d4035fb4702e7fb29ace3b0550ce
        const mutators = {
            ...mongooseApi.mutators,
        };
        graphqlHTTP({
            schema,
            context: {mongooseApi, loaders, mutators},
            graphiql: true,
            customFormatErrorFn: (err) => {
                const errorReport = {
                  message: err.message,
                  locations: err.locations,
                  stack: err.stack ? err.stack.split('\n') : [],
                  path: err.path,
                };
                console.error('GraphQL Error', errorReport);
                return config.isDev
                  ? errorReport
                  : { message: 'Oops! Something went wrong! :(' };
              },
            })(req, res);
    });

    server.listen(config.port, () => {
        console.log(`Server URL: http://localhost:${config.port}/`);
      });
}
main();