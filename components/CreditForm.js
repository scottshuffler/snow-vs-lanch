import { useState } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import CreditLine from "./CreditLine";
import Chart from "./Chart";

function CreditForm() {
  const [data, setData] = useState([
    {
      name: "",
      apr: 0,
      minPay: 0,
      promoAPR: 0,
      promoDate: "",
      id: 0,
      balance: 0
    }
  ]);
  const [chart, setChart] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [message, setMessage] = useState(false);
  const [messageData, setMessageData] = useState({
    color: "red",
    header: "",
    text: ""
  });
  const [snowball, setSnowball] = useState(0);
  const [count, setCount] = useState(1);

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
        id: count,
        balance: 0
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
    setData(dt);
  };

  const calculate = e => {
    let chartDataLocal = [];
    let n = Math.ceil(parseFloat(data[0].balance) / parseFloat(data[0].minPay));
    let b = parseFloat(data[0].balance);
    for (let i = 0; i < n; i++) {
      chartDataLocal.push({
        name: "Month " + (i + 1),
        balance: b,
        paid: parseFloat(data[0].minPay)
      });
      b = b - parseFloat(data[0].minPay);
    }

    if (b < 0) {
      let lastPayment = parseFloat(data[0].minPay) + b;
      console.log(lastPayment);
      chartDataLocal.push({
        name: "Month " + (n + 1),
        balance: 0,
        paid: lastPayment
      });
    }

    setChartData(chartDataLocal);
    setChart(!chart);
  };

  const goBack = e => {
    setChart(!chart);
  };

  return (
    <div>
      {message ? (
        <Message
          color={messageData.color}
          header={messageData.header}
          content={messageData.text}
        />
      ) : null}

      {!chart ? (
        <Form>
          <h3>Add your lines of credit</h3>
          {data.map((n, i) => {
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
            <Form.Field
              id="snowball"
              control={Input}
              placeholder="100"
              width={4}
              onChange={e => setSnowball(e.target.value)}
              value={snowball}
            />
          </div>
          <Button style={style} primary onClick={calculate}>
            Calculate
          </Button>
        </Form>
      ) : (
        <div>
          <Chart data={chartData} />
          <Button style={style} primary onClick={goBack}>
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
}

export default CreditForm;
