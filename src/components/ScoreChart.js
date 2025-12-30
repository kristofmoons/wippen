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
import { prepareChartData } from "../utils/gameUtils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Get chart options based on dark mode
 * @param {boolean} isDarkMode - Whether dark mode is enabled
 * @returns {Object} - Chart options
 */
const getChartOptions = (isDarkMode) => {
  const textColor = isDarkMode ? "#ffffff" : "#666666";
  const gridColor = isDarkMode
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
        },
      },
      title: {
        display: true,
        text: "Score Verloop",
        font: { size: 18 },
        color: textColor,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label || ""}: ${context.parsed.y} punten`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Cumulatieve Score",
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
      x: {
        title: {
          display: true,
          text: "Ronde",
          color: textColor,
        },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };
};

/**
 * Line chart component for displaying score progression
 */
const ScoreChart = ({ rounds }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.body.classList.contains("dark-mode"));
    };

    // Initial check
    checkDarkMode();

    // Watch for changes to body class
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setChartData(prepareChartData(rounds));
  }, [rounds]);

  return (
    <div className="chart-container" style={{ height: "400px" }}>
      <Line data={chartData} options={getChartOptions(isDarkMode)} />
    </div>
  );
};

export default ScoreChart;


