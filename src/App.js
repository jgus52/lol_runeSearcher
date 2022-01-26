import Home from "./Home";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { GlobalStyles } from "./comp/Style";

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Home></Home>
    </ApolloProvider>
  );
}

export default App;
