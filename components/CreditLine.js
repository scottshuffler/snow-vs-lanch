import { Form, Input } from "semantic-ui-react";
import { useState } from "react";

function SingleForm(props) {
  const [data, setName] = useState(props.data);

  const updateField = e => {
    setName({
      ...data,
      [e.target.id]: e.target.value
    });

    let d = props.data;
    d[e.target.id] = e.target.value;
    props.parentCallback(d);
  };

  return (
    <div>
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
          id="apr"
          control={Input}
          label="APR"
          placeholder="20%"
          onChange={updateField}
          value={data.apr}
          type='number' 
          max={5}
        />
        <Form.Field
          id="minPay"
          control={Input}
          label="Minimum Payment"
          placeholder="100"
          onChange={updateField}
          value={data.minPay}
        />
        <Form.Field
          id="promoAPR"
          control={Input}
          label="Promotional APR%"
          placeholder="0%"
          onChange={updateField}
          value={data.promoAPR}
        />
        <Form.Field
          id="promoDate"
          control={Input}
          label="Promotional APR end (MM/DD/YY)"
          placeholder="10/01/19"
          onChange={updateField}
          value={data.promoDate}
        />
      </Form.Group>
    </div>
  );
}

export default SingleForm;
