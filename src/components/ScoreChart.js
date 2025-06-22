import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ScoreChart = ({ rounds }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (rounds.length === 0) return;

    const playerData = {};
    
    rounds.forEach((round, roundIndex) => {
      round.players.forEach((player) => {
        if (!playerData[player.name]) {
          playerData[player.name] = {
            scores: Array(rounds.length).fill(0),
            color: getRandomColor(player.name),
          };
        }
        
        const previousScore = roundIndex > 0 ? playerData[player.name].scores[roundIndex - 1] : 0;
        playerData[player.name].scores[roundIndex] = previousScore + player.score;
      });
    });

    setChartData({
      labels: rounds.map((_, index) => `Ronde ${index + 1}`),
      datasets: Object.entries(playerData).map(([name, data]) => ({
        label: name,
        data: data.scores,
        borderColor: data.color,
        backgroundColor: `${data.color}33`, 
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
      })),
    });
  }, [rounds]);

  const getRandomColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const c = (hash & 0x00ffffff).toString(16).toUpperCase().padStart(6, "0");
    return `#${c}`;
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Score Verloop",
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value} punten`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Cumulatieve Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Ronde",
        },
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ScoreChart;


