import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://lol-runesearcher-kr.herokuapp.com/",
  cache: new InMemoryCache(),
});
