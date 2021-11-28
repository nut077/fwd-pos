import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, ButtonGroup, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

const ReportPage = () => {
  const [chartType, setChartType] = useState("bar");
  const [chartData, setChartData] = useState([]);
  const [chartDataAnother, setChartDataAnother] = useState([]);

  function getRandomInt(): any {
    let randoms = [];
    for (let index = 0; index < 8; index++) {
      randoms.push(Math.floor(Math.random() * (50000 - 5 + 1)) + 5);
    }
    return randoms;
  }

  const data: any = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Revenue 2018",
        fill: true,
        lineTension: 0.1,
        backgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(153, 102, 255, 0.9)",
          "rgba(255, 159, 64, 0.9)",
          "rgba(255, 99, 132, 0.9)",
        ],
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartData,
      },
      {
        label: "Revenue 2019",
        fill: true,
        lineTension: 0.1,
        backgroundColor: ["rgba(255, 255, 255, 0.5)"],
        borderColor: "rgba(75,192,192,0.5)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,0.5)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,0.5)",
        pointHoverBorderColor: "rgba(220,220,220,0.5)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: chartDataAnother,
      },
    ],
  };

  const chartOption: any = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            callback: function (value: any, index: any, values: any) {
              return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
          },
        },
      ],
    },
  };

  useEffect(() => {
    setChartData(getRandomInt());
    setChartDataAnother(getRandomInt());
  }, []);

  return (
    <div>
      <Typography variant="h1">Sale Chart</Typography>
      <ButtonGroup
        size="large"
        color="primary"
        aria-label="large outlined primary button group"
      >
        <Button
          variant={chartType === "line" ? "contained" : "outlined"}
          onClick={() => setChartType("line")}
        >
          Line
        </Button>
        <Button
          variant={chartType === "bar" ? "contained" : "outlined"}
          onClick={() => setChartType("bar")}
        >
          Bar
        </Button>
        <Button
          variant={chartType === "pie" ? "contained" : "outlined"}
          onClick={() => setChartType("pie")}
        >
          Pie
        </Button>
      </ButtonGroup>
      <IconButton
        aria-label="refresh"
        onClick={() => {
          setChartData(getRandomInt());
          setChartDataAnother(getRandomInt());
        }}
      >
        <RefreshIcon />
      </IconButton>
      <div style={{ height: 500 }}>
        {chartType === "line" && (
          <Line data={data} width="100%" height={50} options={chartOption} />
        )}
        {chartType === "pie" && (
          <Pie data={data} width="100%" height={50} options={chartOption} />
        )}
        {chartType === "bar" && (
          <Bar data={data} width="100%" height={50} options={chartOption} />
        )}
      </div>
    </div>
  );
};

export default ReportPage;
