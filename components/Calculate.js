import moment from "moment";

export function calculateChartData(data, snowball) {
  // console.log(moment().daysInMonth());
  // console.log(moment("20120201", "YYYYMMDD").daysInMonth()); // 29
  // console.log(moment("20120101", "YYYYMMDD").daysInMonth()); // 31
  // let daysInMonth = moment().format("DD");
  let currYear = moment().format("YYYY");
  let nYear = currYear;
  let currMonth = moment().format("MM");
  let nMonth = currMonth;
  let promoSplit = data[0].promoDate.split("-");
  let promoYear = promoSplit[2];
  let promoMonth = promoSplit[1];
  let d1 = new Date(currYear,currMonth-1,1);
  let d2 = new Date(promoYear,promoMonth-1,1);
  let months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  let promoRemain = months;

  let chartDataLocal = [];
  // let n = Math.ceil(parseFloat(data[0].balance) / parseFloat(data[0].minPay));

  let b = parseFloat(data[0].balance);
  let i = 1;
  while (b > 0) {
    chartDataLocal.push({
      name: "Month " + i,
      balance: b,
      paid: parseFloat(data[0].minPay) + parseFloat(snowball)
    });
    //b = b - (parseFloat(data[0].minPay) + parseFloat(snowball));
    let apr = 0;
    if(promoRemain > 0) {
      apr = data[0].promoAPR;
      promoRemain--;
    } else {
      apr = data[0].apr;
    }
    let days = moment('"' + nYear + nMonth + '"', "YYYYMM").daysInMonth();
    let dailyAPR = apr / 365 / 100;
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


  if (b === 0) {
    chartDataLocal.push({
      name: "Month " + i,
      balance: 0,
      paid: parseFloat(data[0].minPay) + parseFloat(snowball)
    });
  }

  if (b < 0) {
    let lastPayment = parseFloat(data[0].minPay) + parseFloat(snowball) + b;
    // console.log(lastPayment);
    chartDataLocal.push({
      name: "Month " + i,
      balance: 0,
      paid: lastPayment
    });
  }

  return chartDataLocal;
}
