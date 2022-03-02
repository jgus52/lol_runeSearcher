import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://lol-runesearcher-kr.herokuapp.com/graphql"
      : "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Champ: {
        keyFields: false,
      },
    },
  }),
});

export const URI =
  process.env.NODE_ENV === "production"
    ? "https://lol-runesearcher-kr.herokuapp.com"
    : "http://localhost:4000";
