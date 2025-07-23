// CO₂ Trends Line Chart - Chart.js
// Source: Antarctic ice core data (Lüthi et al 2008, Bereiter et al 2015) + Mauna Loa Observatory (Scripps/NOAA)
// Chart by Boney Philip, 

const ctx = document.getElementById('co2TrendsChart').getContext('2d');

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      '800,000', '600,000', '400,000', '200,000', '100,000', '50,000', '10,000', 'Year 0 (AD 1750)', '2023'
    ],
    datasets: [
      {
        label: 'Ice Core Data',
        data: [180, 200, 250, 210, 180, 190, 270, 280, null], // up to pre-industrial, null for recent years
        borderColor: '#36a2eb', // blue
        backgroundColor: 'rgba(54,162,235,0.15)',
        tension: 0.4,
        pointRadius: 4,
        spanGaps: true,
      },
      {
        label: 'Modern Instrument Data',
        data: [null, null, null, null, null, null, null, 280, 420], // starts at pre-industrial (Year 0) and continues to now
        borderColor: '#ff6384', // red
        backgroundColor: 'rgba(255,99,132,0.10)',
        tension: 0.4,
        pointRadius: 4,
        spanGaps: true,
      }
    ]
  },
  options: {
    plugins: {
      legend: { display: true },
      title: { display: false }
    },
    scales: {
      x: {
        title: { display: true, text: 'Years Before Present' }
      },
      y: {
        title: { display: true, text: 'CO₂ (ppm)' },
        min: 150,
        max: 450
      }
    }
  }
});
