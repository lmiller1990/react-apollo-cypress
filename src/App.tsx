import { Countries } from "./Countries";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql";

function App() {
  return (
    <ApolloProvider client={client}>
      <Countries />
    </ApolloProvider>
  );
}

export default App;
