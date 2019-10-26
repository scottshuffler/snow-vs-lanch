import withLayout from "../components/Layout";
import CreditForm from "../components/CreditForm";
import Head from 'next/head';

const style = {
  marginTop: 30
};

const Page = () => {
  return (
    <div style={style}>
      <Head>
      <title>Snowball vs Avalanche Visualizer</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="Description" content="Snowball and Avalanche debt visualizer" />
      <link
          rel="stylesheet"
          href="../static/main.css"
        />
        <link
          rel="stylesheet"
          href="../static/semantic.css"
        />
      </Head>
      <CreditForm />
    </div>
  );
};

export default withLayout(Page);
