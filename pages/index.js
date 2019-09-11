import withLayout from "../components/Layout";
import CreditForm from "../components/CreditForm";

const style = {
  marginTop: 30
};

const Page = () => {
  return (
    <div style={style}>
      <CreditForm />
    </div>
  );
};

export default withLayout(Page);
