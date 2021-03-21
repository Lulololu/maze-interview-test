import "../styles/normalize.css"; // Next.js authorizes Materialize.css (Global CSS) to be imported ONLY from _app.js
import Layout from "../Components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
