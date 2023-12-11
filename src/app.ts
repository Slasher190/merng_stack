import { ApolloServer } from "@apollo/server";
import typeDefs from "./graphql/Typedefs/typedefs";
import resolvers from "./graphql/Resolvers";
import * as dotenv from "dotenv";

dotenv.config();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});
