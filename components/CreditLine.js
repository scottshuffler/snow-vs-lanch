import { Checkbox, Form, Input } from "semantic-ui-react";
import { useState } from "react";

function SingleForm(props) {
  const [data, setName] = useState(props.data);

  const [hasPromo, setHasPromo] = useState(false);

  const updateField = e => {
    setName({
      ...data,
      [e.target.id]: e.target.value
    });

    let d = props.data;
    d[e.target.id] = e.target.value;
    props.parentCallback(d);
  };

  const togglePromo = e => {
    setHasPromo(!hasPromo);
    // setName({
    //   ...data,
    //   [e.target.id]: e.target.value
    // });

    // let d = props.data;
    // d[e.target.id] = e.target.value;
    // props.parentCallback(d);
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <Form.Group widths="equal">
        <Form.Field
          id="name"
          control={Input}
          label="Line of credit"
          placeholder="Name"
          onChange={updateField}
          value={data.name}
        />
        <Form.Field
          id="balance"
          control={Input}
          label="Balance"
          placeholder="1000"
          onChange={updateField}
          value={data.balance}
          type="number"
          // max={5}
        />
        <Form.Field
          id="apr"
          control={Input}
          label="APR"
          placeholder="20%"
          onChange={updateField}
          value={data.apr}
          type="number"
          // max={5}
        />
        <Form.Field
          id="minPay"
          control={Input}
          label="Minimum Payment"
          placeholder="100"
          onChange={updateField}
          value={data.minPay}
        />
        <Form.Checkbox
          // id="minPay"
          control={Checkbox}
          label="Does this card have a promotional APR?"
          // placeholder="100"
          onChange={togglePromo}
          // value={data.minPay}
        />
        {/* <Checkbox 
        label="Promotional APR?"
        onChange={}
        /> */}
        {hasPromo
          ? <Form.Field
              id="promoAPR"
              control={Input}
              label="Promotional APR%"
              placeholder="0%"
              onChange={updateField}
              value={data.promoAPR}
            />
          : null}
        {hasPromo
          ? <Form.Field
              id="promoDate"
              control={Input}
              label="Promotional APR end (MM/DD/YY)"
              placeholder="10/01/19"
              onChange={updateField}
              value={data.promoDate}
            />
          : null}
      </Form.Group>
    </div>
  );
}

export default SingleForm;
