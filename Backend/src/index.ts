import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/typeDefs";
import { userResolvers } from "./resolvers/userResolver";
import { transactionResolvers } from "./resolvers/transactionResolver";
import { categoryResolvers } from "./resolvers/categoryResolver";

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...transactionResolvers.Query,
        ...categoryResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...transactionResolvers.Mutation,
        ...categoryResolvers.Mutation,
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
