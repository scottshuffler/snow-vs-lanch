import { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import CreditLine from "./CreditLine";
import Chart from "./Chart";
import Snowball from "./Snowball";
import AddDelButtons from "./AddDelButtons";
import moment from "moment";

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
    console.log(moment().daysInMonth());
    console.log(moment("20120201", "YYYYMMDD").daysInMonth()); // 29
    console.log(moment("20120101", "YYYYMMDD").daysInMonth()); // 31
    // let daysInMonth = moment().format("DD");
    let currYear = moment().format("YYYY");
    let nYear = currYear;
    let currMonth = moment().format("MM");
    let nMonth = currMonth;

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

      let chartDataLocal = [];
      let n = Math.ceil(
        parseFloat(data[0].balance) / parseFloat(data[0].minPay)
      );

      let b = parseFloat(data[0].balance);
      let i = 1;
      while (b > 0) {
        chartDataLocal.push({
          name: "Month " + i,
          balance: b,
          paid: parseFloat(data[0].minPay) + parseFloat(snowball)
        });
        //b = b - (parseFloat(data[0].minPay) + parseFloat(snowball));
        let days = moment('"' + nYear + nMonth + '"', "YYYYMM").daysInMonth;
        let dailyAPR = data[0].apr / 365;
        let dailyInterest = dailyAPR * b;
        let cycleInterest = dailyInterest * days;
        b =
          b +
          cycleInterest -
          (parseFloat(data[0].minPay) + parseFloat(snowball));
        i++;
        nMonth++;
        if(nMonth == 13) {
          nMonth = 1;
          nYear++;
        }
      }
      console.log(b);

      if (b === 0) {
        chartDataLocal.push({
          name: "Month " + i,
          balance: 0,
          paid: parseFloat(data[0].minPay) + parseFloat(snowball)
        });
      }

      if (b < 0) {
        let lastPayment = parseFloat(data[0].minPay) + parseFloat(snowball) + b;
        console.log(lastPayment);
        chartDataLocal.push({
          name: "Month " + (n + 1),
          balance: 0,
          paid: lastPayment
        });
      }

      console.log(chartDataLocal);

      setChartData(chartDataLocal);
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
