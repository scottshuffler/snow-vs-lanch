import { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import CreditLine from "./CreditLine";
import Chart from "./Chart";
import Snowball from "./Snowball";
import AddDelButtons from "./AddDelButtons";
import { calculateChartData } from './Calculate';

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
  //top
  const calculate = e => {
    console.log(snowball);
    if (parseFloat(data[0].balance) <= 0 || parseFloat(data[0].minPay) <= 0) {
      setMessageData({
        header: "Error",
        text: "Balance and Minimum Payment must be greater than zero",
        color: "red"
      });
      setMessage(true);
    } else {
      setMessage(false);
      setChartData(calculateChartData(data));
      setChart(true);
    }
  };

  const goBack = e => {
    setChart(false);
  };

  return (
    <div>
      {message
        ? <Message
            color={messageData.color}
            header={messageData.header}
            content={messageData.text}
          />
        : null}

      {chart
        ? <Chart data={chartData} goBack={goBack} />
        : <Form>
            <h3>Add your lines of credit</h3>
            {data.map((n, i) => {
              return (
                <CreditLine data={n} parentCallback={handleUpdate} key={i} />
              );
            })}

            <AddDelButtons handleAdd={handleAdd} handleDelete={handleDelete} />

            <Snowball
              data={snowball}
              calculate={calculate}
              snowballChange={setSnowball}
            />
          </Form>}
    </div>
  );
}

export default CreditForm;
