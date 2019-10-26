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
      {/* <link
          rel="stylesheet"
          href="../static/main.css"
          title="Snowball vs Avalanche Visualizer"
        /> */}
        <link
          rel="stylesheet"
          href="../static/semantic.css"
          title="Snowball vs Avalanche Visualizer"
        />
      </Head>
      <CreditForm />
    </div>
  );
};

export default withLayout(Page);
