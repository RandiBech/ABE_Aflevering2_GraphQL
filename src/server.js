import express from "express";
import cors from "cors";
import * as config from "./config";
import mongooseApiWrapper from "./db/mongoose-api.js";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";

async function main() {
  const mongooseApi = await mongooseApiWrapper();
  const server = express();
  server.use(cors());
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use("/:fav.ico", (req, res) => res.sendStatus(204));

  //tjek for Auth token her? listin 8.23
  // CurrentUser sættes her

  server.use("/graphql", (req, res) => {
    const loaders = {
      ...mongooseApi.queries,
    };
    const mutators = {
      ...mongooseApi.mutators,
    };
    graphqlHTTP({
      schema,
      context: { mongooseApi, loaders, mutators, CurrentUser },
      graphiql: { headerEditorEnabled: true },
      customFormatErrorFn: (err) => {
        const errorReport = {
          message: err.message,
          locations: err.locations,
          stack: err.stack ? err.stack.split("\n") : [],
          path: err.path,
        };
        console.error("GraphQL Error", errorReport);
        return config.isDev
          ? errorReport
          : { message: "Oops! Something went wrong! :(" };
      },
    })(req, res);
  });

  server.listen(config.port, () => {
    console.log(`Server URL: http://localhost:${config.port}/`);
  });
}
main();
