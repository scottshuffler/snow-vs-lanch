import moment from "moment";

export function calculateChartData(data) {
  // console.log(moment().daysInMonth());
  // console.log(moment("20120201", "YYYYMMDD").daysInMonth()); // 29
  // console.log(moment("20120101", "YYYYMMDD").daysInMonth()); // 31
  // let daysInMonth = moment().format("DD");
  let currYear = moment().format("YYYY");
  let nYear = currYear;
  let currMonth = moment().format("MM");
  let nMonth = currMonth;

  let chartDataLocal = [];
  let n = Math.ceil(parseFloat(data[0].balance) / parseFloat(data[0].minPay));

  let b = parseFloat(data[0].balance);
  let i = 1;
  while (b > 0) {
    chartDataLocal.push({
      name: "Month " + i,
      balance: b,
      paid: parseFloat(data[0].minPay) + parseFloat(snowball)
    });
    //b = b - (parseFloat(data[0].minPay) + parseFloat(snowball));
    let days = moment('"' + nYear + nMonth + '"', "YYYYMM").daysInMonth();
    let dailyAPR = data[0].apr / 365 / 100;
    let dailyInterest = parseFloat(dailyAPR) * b;
    let cycleInterest = dailyInterest * days;
    b = b + cycleInterest - (parseFloat(data[0].minPay) + parseFloat(snowball));
    i++;
    nMonth++;
    if (nMonth == 13) {
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

  return chartDataLocal;
}
