document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById('carbonRemovalChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Forests', 'Soil', 'Peatlands', 'Direct Air Capture', 'Biochar', 'Oceans'
      ],
      datasets: [{
        label: 'Annual Carbon Removal Potential (GtCO₂/year)',
        data: [3.5, 1.7, 1.0, 0.7, 1.2, 2.0],
        borderWidth: 1,
        backgroundColor: [
          '#0fc4c7','#4ecb6b','#bfc9d1','#ecd06f','#8ed0ec','#1c658c'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "GtCO₂ per year" }
        }
      }
    }
  });
});
