import { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import CreditLine from "./CreditLine";
import Chart from './Chart';

function CreditForm() {
  let dataTemplate = {
    name: "",
    apr: 0,
    minPay: 0,
    promoAPR: 0,
    promoDate: "",
    id: 0
  };

  const [data, setData] = useState([dataTemplate]);
  const [chart, setChart] = useState(false);
  const [snowball, setSnowball] = useState(0);
  const [count, setCount] = useState(1);

  const ndata = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];

  const style = {
    marginTop: 30
  };

  const handleAdd = e => {
    setData([
      ...data,
      {
        name: "",
        apr: 0,
        minPay: 0,
        promoAPR: 0,
        promoDate: "",
        id: count
      }
    ]);
    setCount(count + 1);
  };

  const handleDelete = e => {
    if (data.length > 1) {
      data.splice(-1, 1);
      setData([...data]);
      setCount(count - 1);
    }
  };

  const handleUpdate = childData => {
    var foundIndex = data.findIndex(x => x.id == childData.id);
    let dt = data;
    dt[foundIndex] = childData;
    console.log(dt);
    setData(dt);
  };

  const calculate = e => {
    setChart(!chart);
  };

  const goBack = e => {
    setChart(!chart);
  };

  return (
    <div>
      {!chart ? (
        <Form>
          <h3>Add your lines of credit</h3>
          {data.map((n, i) => {
            console.log(i);
            return (
              <CreditLine data={n} parentCallback={handleUpdate} key={i} />
            );
          })}

          <Button primary onClick={handleAdd}>
            Add Credit Line
          </Button>
          <Button secondary onClick={handleDelete}>
            Delete Credit Line
          </Button>

          <div style={style}>
            <h3>How much extra can you pay each month?</h3>
            <Form>
              <Form.Field
                id="snowball"
                control={Input}
                placeholder="100"
                width={4}
                onChange={e => setSnowball(e.target.value)}
                value={snowball}
              />
            </Form>
          </div>
          <Button style={style} primary onClick={calculate}>
            Calculate
          </Button>
        </Form>
      ) : (
        <div>
          <Chart data={ndata} />
          <Button style={style} primary onClick={goBack}>
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
}

export default CreditForm;
