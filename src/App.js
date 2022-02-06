import Home from "./screens/Home";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { GlobalStyles } from "./comp/Style";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MultiSearch from "./screens/MultiSearch";
import Header from "./comp/Header";

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/multi" element={<MultiSearch />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
