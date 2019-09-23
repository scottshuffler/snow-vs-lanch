import { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";

function Snowball(props) {
  const [snowball, setSnowball] = useState(props.data);

  const style = {
    marginTop: 30
  };

  const updateField = e => {
    setSnowball(e.target.value);
    props.snowballChange(e.target.value);
  };

  return (
    <div>
      <div style={style}>
        <h3>How much extra can you pay each month?</h3>
        <Form.Field
          id="snowball"
          control={Input}
          placeholder="100"
          width={4}
          onChange={updateField}
          value={snowball}
        />
      </div>
      <Button style={style} primary onClick={props.calculate}>
        Calculate
      </Button>
    </div>
  );
}

export default Snowball;
