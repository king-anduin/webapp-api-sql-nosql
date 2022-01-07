$(document).ready(function () {
  const timerDuration = 10 * 60

  let highestValueUber = 0
  let highestValueLyft = 0
  let highestValueTaxi = 0

  const data = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: '# - Uber',
        backgroundColor: "rgba(50,220,220,5)",
        data: [0],
      },
      {
        label: '# - Lyft',
        backgroundColor: "rgba(0,255,127)",
        data: [0],
      },
      {
        label: '# - Taxi',
        backgroundColor: "rgba(255,127,36)",
        data: [0],
      }
    ]
  }

  const updateDataUber = function (newVal) {
    const dataSetInitial = data["datasets"][0]["data"];
    const newData = Math.floor(newVal);
    dataSetInitial.push(newData);
  };
  const updateDataLyft = function (newVal) {
    const dataSetInitial = data["datasets"][1]["data"];
    const newData = Math.floor(newVal);
    dataSetInitial.push(newData);
  };
  const updateDataTaxi = function (newVal) {
    const dataSetInitial = data["datasets"][2]["data"];
    const newData = Math.floor(newVal);
    dataSetInitial.push(newData);
  };

  const ctx = document.getElementById("myChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: 'bar',
    data,
    options: {
      animation: false,
      scales: {
        yAxes: {
          ticks: {
            beginAtZero: true
          }
        }
      }
    }
  });

  function webSocketInvoke() {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected');
      console.log(socket);

      socket.on('message', function (arg) {
        let currentValue = arg.offset
        if (arg.partition == 0) {
          if (currentValue > highestValueUber) {
            highestValueUber = currentValue
          }
        }
        if (arg.partition == 1) {
          if (currentValue > highestValueLyft) {
            highestValueLyft = currentValue
          }
        }
        if (arg.partition == 2) {
          if (currentValue > highestValueTaxi) {
            highestValueTaxi = currentValue
          }
        }
      })

      function everyMinute() {
        updateDataUber(highestValueUber)
        updateDataLyft(highestValueLyft)
        updateDataTaxi(highestValueTaxi)
        chart.update()
        console.log('Uber: ', highestValueUber);
        console.log('Lyft: ', highestValueLyft);
        console.log('Taxi: ', highestValueTaxi);
      }
      let timer = setInterval(everyMinute, 60000);
      setTimeout(() => { clearInterval(timer); console.log('10 Minutes are over'); }, timerDuration * 1000 + 1000)

    });

  }
  webSocketInvoke();
});