// global-temp-anomaly-chart.js

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("globalTempChart");
  if (!ctx) return;

  // Sample NASA GISTEMP (smoothed, for demonstration)
  const years = [
    1880, 1890, 1900, 1910, 1920, 1930, 1940, 1950,
    1960, 1970, 1980, 1990, 2000, 2010, 2020, 2023
  ];
  const anomalies = [
    -0.21, -0.13, -0.12, -0.44, -0.27, -0.15, 0.07, -0.18,
    -0.02, -0.02, 0.18, 0.32, 0.42, 0.63, 0.99, 1.18 // °C vs 1951-1980 avg
  ];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [{
        label: "Global Temp Anomaly (°C)",
        data: anomalies,
        fill: true,
        borderColor: "#00adb5",
        backgroundColor: "rgba(0,173,181,0.17)",
        tension: 0.25,
        pointRadius: 2.7,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#00adb5"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Anomaly: ${context.parsed.y.toFixed(2)} °C`;
            }
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: "Year" },
          ticks: { color: "#adbcc6" },
          grid: { color: "rgba(100,150,170,0.1)" }
        },
        y: {
          title: { display: true, text: "Temperature Anomaly (°C)" },
          ticks: { color: "#adbcc6" },
          grid: { color: "rgba(100,150,170,0.1)" }
        }
      }
    }
  });
});
