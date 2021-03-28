import "../styles/normalize.css"; // Next.js authorizes Materialize.css (Global CSS) to be imported ONLY from _app.js
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import Layout from "../Components/Layout";

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
