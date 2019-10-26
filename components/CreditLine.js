import { Checkbox, Form, Input } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import { useState } from "react";

function SingleForm(props) {
  const [data, setName] = useState(props.data);

  const [hasPromo, setHasPromo] = useState(false);

  // this.state = {
  //   date: "",
  // };

  const updateField = e => {
    console.log(e);
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
  };

  const handleChange = (event, {id, value}) => {
    setName({
      ...data,
      [id]: value
    });

    let d = props.data;
    d[id] = value;
    props.parentCallback(d);
  }

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
          // type="number"
          // max={5}
        />
        <Form.Field
          id="apr"
          control={Input}
          label="APR"
          placeholder="20%"
          onChange={updateField}
          value={data.apr}
          // type="number"
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
        {!hasPromo
          ? <Form.Checkbox
              // id="minPay"
              control={Checkbox}
              label="Promotional APR?"
              // placeholder="100"
              onChange={togglePromo}
              // value={data.minPay}
            />
          : null}

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
          ? // <Form.Field
            //     id="promoDate"
            //     control={Input}
            //     label="Promotional APR end (MM/DD/YY)"
            //     placeholder="10/01/19"
            //     onChange={updateField}
            //     value={data.promoDate}
            //   />
            <DateInput
              id="promoDate"
              name="promoDate"
              placeholder="Date"
              value={data.promoDate}
              iconPosition="left"
              animation='none'
              onChange={handleChange}
            />
          : null}
      </Form.Group>
    </div>
  );
}

export default SingleForm;
