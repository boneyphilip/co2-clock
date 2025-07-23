// Fixed script.js for GitHub Pages deployment
// Navbar transparency on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar && window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else if (navbar) {
        navbar.classList.remove('scrolled');
    }
});

// === Simulated Weekly CO₂ Data ===
const weeklyCO2 = [428.5, 428.6, 428.7, 428.8, 428.92357];

// Calculate how much CO₂ is rising every second (ppm/second)
const first = weeklyCO2[0];
const last = weeklyCO2[weeklyCO2.length - 1];
const weeks = weeklyCO2.length - 1;
const weeklyRise = (last - first) / weeks;
const dailyRise = weeklyRise / 7;
const secRise = dailyRise / (24 * 60 * 60);

// Starting point for CO₂ value
let currentCO2 = last;

/**
 * Update CO2 Display with animation
 */
function updateCO2Display(value) {
  const digits = value.toFixed(6).replace(".", "").padStart(9, "0");
  const digitDivs = document.querySelectorAll(".co2-number .digit");

  for (let i = 0; i < digitDivs.length; i++) {
    let stack = digitDivs[i].querySelector(".digit-stack");
    const newDigit = digits[i];
    const oldDigit = stack ? stack.getAttribute("data-current") : null;

    if (!stack) {
      stack = document.createElement("span");
      stack.className = "digit-stack";
      stack.setAttribute("data-current", newDigit);
      stack.innerHTML = `<span>${newDigit}</span><span>${newDigit}</span>`;
      digitDivs[i].innerHTML = "";
      digitDivs[i].appendChild(stack);
      continue;
    }

    if (oldDigit !== newDigit) {
      stack.innerHTML = `<span>${oldDigit}</span><span>${newDigit}</span>`;
      stack.style.transform = "translateY(0)";
      stack.setAttribute("data-current", newDigit);

      setTimeout(() => {
        stack.style.transform = "translateY(-1.2em)";
      }, 10);

      setTimeout(() => {
        stack.innerHTML = `<span>${newDigit}</span><span>${newDigit}</span>`;
        stack.style.transition = "none";
        stack.style.transform = "translateY(0)";
        void stack.offsetWidth;
        stack.style.transition = "";
      }, 410);
    }
  }
}

// === Dashboard Data ===
const emissionsData = [
  { rank: 1, country: "China", code: "cn", total: 11470, percent: 30.9, perCapita: 8.05, trend: "up" },
  { rank: 2, country: "United States", code: "us", total: 5000, percent: 13.5, perCapita: 15.24, trend: "down" },
  { rank: 3, country: "India", code: "in", total: 2800, percent: 7.6, perCapita: 2.05, trend: "up" },
  { rank: 4, country: "Russia", code: "ru", total: 1600, percent: 4.3, perCapita: 11.20, trend: "steady" },
  { rank: 5, country: "Japan", code: "jp", total: 1150, percent: 3.1, perCapita: 9.13, trend: "down" },
  { rank: 6, country: "Iran", code: "ir", total: 800, percent: 2.2, perCapita: 9.50, trend: "up" },
  { rank: 7, country: "Germany", code: "de", total: 700, percent: 1.9, perCapita: 8.40, trend: "down" },
  { rank: 8, country: "South Korea", code: "kr", total: 680, percent: 1.8, perCapita: 13.18, trend: "steady" },
  { rank: 9, country: "Saudi Arabia", code: "sa", total: 630, percent: 1.7, perCapita: 18.05, trend: "up" },
  { rank: 10, country: "Indonesia", code: "id", total: 620, percent: 1.7, perCapita: 2.30, trend: "up" },
  { rank: 11, country: "Canada", code: "ca", total: 600, percent: 1.6, perCapita: 15.83, trend: "steady" },
  { rank: 12, country: "Mexico", code: "mx", total: 480, percent: 1.3, perCapita: 3.72, trend: "up" },
  { rank: 13, country: "Brazil", code: "br", total: 470, percent: 1.3, perCapita: 2.25, trend: "up" },
  { rank: 14, country: "South Africa", code: "za", total: 450, percent: 1.2, perCapita: 7.60, trend: "steady" },
  { rank: 15, country: "Turkey", code: "tr", total: 430, percent: 1.2, perCapita: 5.10, trend: "up" },
  { rank: 16, country: "United Kingdom", code: "gb", total: 380, percent: 1.0, perCapita: 5.60, trend: "down" },
  { rank: 17, country: "Australia", code: "au", total: 370, percent: 1.0, perCapita: 14.58, trend: "steady" },
  { rank: 18, country: "France", code: "fr", total: 300, percent: 0.8, perCapita: 4.50, trend: "down" },
  { rank: 19, country: "Italy", code: "it", total: 290, percent: 0.8, perCapita: 4.90, trend: "down" },
  { rank: 20, country: "Poland", code: "pl", total: 280, percent: 0.8, perCapita: 7.40, trend: "steady" },
  { rank: 21, country: "Thailand", code: "th", total: 270, percent: 0.7, perCapita: 3.90, trend: "up" },
  { rank: 22, country: "Egypt", code: "eg", total: 250, percent: 0.7, perCapita: 2.40, trend: "up" },
  { rank: 23, country: "Pakistan", code: "pk", total: 240, percent: 0.6, perCapita: 1.10, trend: "up" },
  { rank: 24, country: "Spain", code: "es", total: 230, percent: 0.6, perCapita: 4.80, trend: "down" },
  { rank: 25, country: "Ukraine", code: "ua", total: 200, percent: 0.5, perCapita: 4.70, trend: "down" },
  { rank: 26, country: "Vietnam", code: "vn", total: 190, percent: 0.5, perCapita: 2.00, trend: "up" },
  { rank: 27, country: "Malaysia", code: "my", total: 180, percent: 0.5, perCapita: 5.60, trend: "up" },
  { rank: 28, country: "Iraq", code: "iq", total: 170, percent: 0.5, perCapita: 4.20, trend: "up" },
  { rank: 29, country: "Argentina", code: "ar", total: 160, percent: 0.4, perCapita: 3.60, trend: "steady" },
  { rank: 30, country: "Netherlands", code: "nl", total: 150, percent: 0.4, perCapita: 8.70, trend: "down" },
  { rank: 31, country: "Kazakhstan", code: "kz", total: 140, percent: 0.4, perCapita: 7.50, trend: "up" },
  { rank: 32, country: "Uzbekistan", code: "uz", total: 130, percent: 0.4, perCapita: 3.80, trend: "up" },
  { rank: 33, country: "Algeria", code: "dz", total: 120, percent: 0.3, perCapita: 2.70, trend: "steady" },
  { rank: 34, country: "Colombia", code: "co", total: 110, percent: 0.3, perCapita: 2.20, trend: "up" },
  { rank: 35, country: "Philippines", code: "ph", total: 100, percent: 0.3, perCapita: 0.90, trend: "up" },
  { rank: 36, country: "Nigeria", code: "ng", total: 90, percent: 0.2, perCapita: 0.40, trend: "up" },
  { rank: 37, country: "Venezuela", code: "ve", total: 80, percent: 0.2, perCapita: 2.80, trend: "down" },
  { rank: 38, country: "Peru", code: "pe", total: 70, percent: 0.2, perCapita: 2.10, trend: "steady" },
  { rank: 39, country: "Chile", code: "cl", total: 60, percent: 0.2, perCapita: 3.20, trend: "down" },
  { rank: 40, country: "Greece", code: "gr", total: 50, percent: 0.1, perCapita: 4.70, trend: "down" },
  { rank: 41, country: "Belgium", code: "be", total: 48, percent: 0.1, perCapita: 4.20, trend: "down" },
  { rank: 42, country: "Czech Republic", code: "cz", total: 45, percent: 0.1, perCapita: 4.20, trend: "steady" },
  { rank: 43, country: "Bangladesh", code: "bd", total: 43, percent: 0.1, perCapita: 0.26, trend: "up" },
  { rank: 44, country: "Israel", code: "il", total: 42, percent: 0.1, perCapita: 4.60, trend: "steady" },
  { rank: 45, country: "UAE", code: "ae", total: 40, percent: 0.1, perCapita: 4.10, trend: "steady" },
  { rank: 46, country: "Romania", code: "ro", total: 38, percent: 0.1, perCapita: 2.00, trend: "down" },
  { rank: 47, country: "Austria", code: "at", total: 36, percent: 0.1, perCapita: 4.00, trend: "down" },
  { rank: 48, country: "Morocco", code: "ma", total: 35, percent: 0.1, perCapita: 0.95, trend: "up" },
  { rank: 49, country: "Portugal", code: "pt", total: 34, percent: 0.1, perCapita: 3.30, trend: "down" },
  { rank: 50, country: "Hungary", code: "hu", total: 32, percent: 0.1, perCapita: 3.30, trend: "steady" },
  { rank: 51, country: "Serbia", code: "rs", total: 30, percent: 0.08, perCapita: 4.30, trend: "steady" },
  { rank: 52, country: "Finland", code: "fi", total: 28, percent: 0.08, perCapita: 5.10, trend: "down" },
  { rank: 53, country: "Denmark", code: "dk", total: 26, percent: 0.07, perCapita: 4.50, trend: "down" },
  { rank: 54, country: "Norway", code: "no", total: 25, percent: 0.07, perCapita: 4.60, trend: "down" },
  { rank: 55, country: "Bulgaria", code: "bg", total: 24, percent: 0.06, perCapita: 3.50, trend: "steady" },
  { rank: 56, country: "Sweden", code: "se", total: 23, percent: 0.06, perCapita: 2.30, trend: "down" },
  { rank: 57, country: "Slovakia", code: "sk", total: 22, percent: 0.06, perCapita: 4.00, trend: "steady" },
  { rank: 58, country: "Switzerland", code: "ch", total: 20, percent: 0.05, perCapita: 2.30, trend: "down" },
  { rank: 59, country: "Ireland", code: "ie", total: 18, percent: 0.05, perCapita: 3.60, trend: "down" },
  { rank: 60, country: "New Zealand", code: "nz", total: 16, percent: 0.04, perCapita: 3.30, trend: "steady" },
  { rank: 61, country: "Slovenia", code: "si", total: 15, percent: 0.04, perCapita: 7.20, trend: "steady" },
  { rank: 62, country: "Croatia", code: "hr", total: 14, percent: 0.04, perCapita: 3.50, trend: "steady" },
  { rank: 63, country: "Lithuania", code: "lt", total: 12, percent: 0.03, perCapita: 4.30, trend: "steady" },
  { rank: 64, country: "Estonia", code: "ee", total: 11, percent: 0.03, perCapita: 8.30, trend: "steady" },
  { rank: 65, country: "Latvia", code: "lv", total: 10, percent: 0.03, perCapita: 5.30, trend: "steady" },
  { rank: 66, country: "Luxembourg", code: "lu", total: 9, percent: 0.02, perCapita: 14.80, trend: "down" },
  { rank: 67, country: "Cyprus", code: "cy", total: 8, percent: 0.02, perCapita: 6.60, trend: "steady" },
  { rank: 68, country: "Malta", code: "mt", total: 2, percent: 0.005, perCapita: 4.50, trend: "steady" },
  { rank: 69, country: "Iceland", code: "is", total: 2, percent: 0.005, perCapita: 5.90, trend: "steady" },
  { rank: 70, country: "Qatar", code: "qa", total: 70, percent: 0.19, perCapita: 35.60, trend: "up" }
];

// Global variables
let chartInstance = null;
let currentChartType = "total";
let currentSortColumn = "rank";
let currentSortDirection = "asc";

// Utility functions
function getTrendIcon(trend) {
  switch (trend) {
    case "up":
      return '<i class="fas fa-arrow-up text-danger"></i>';
    case "down":
      return '<i class="fas fa-arrow-down text-success"></i>';
    default:
      return '<i class="fas fa-minus text-secondary"></i>';
  }
}

// FIXED: Removed duplicate return statements
function createStatusBar(percent) {
  let barColor = 'bg-success';
  let status = 'Low Impact';
  
  if (percent >= 10) {
    barColor = 'bg-danger';
    status = 'Critical';
  } else if (percent >= 5) {
    barColor = 'bg-warning';
    status = 'High Impact';
  } else if (percent >= 2) {
    barColor = 'bg-info';
    status = 'Moderate';
  }

  return `
    <div class="d-flex align-items-center">
      <div class="progress flex-grow-1 me-2" style="height: 20px; width: 80px;">
        <div class="progress-bar ${barColor}" role="progressbar" 
             style="width: ${Math.min(percent * 3, 100)}%" 
             title="${percent}% of global emissions">
        </div>
      </div>
      <small class="text-muted">${status}</small>
    </div>
  `;
}

function renderTable(data) {
  const tableBody = document.getElementById("countryTable");
  if (!tableBody) return; // Exit if element doesn't exist
  
  tableBody.innerHTML = "";
  
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.rank}</td>
      <td>
        <img src="https://flagcdn.com/w20/${item.code}.png" class="country-flag" alt="${item.country} flag">
        ${item.country}
      </td>
      <td>${item.total.toLocaleString()} Mt</td>
      <td>${item.percent}%</td>
      <td>${item.perCapita} t</td>
      <td>
        ${getTrendIcon(item.trend)} 
        ${item.trend === "up" ? "Increasing" : item.trend === "down" ? "Decreasing" : "Stable"}
      </td>
      <td>${createStatusBar(item.percent)}</td>
    `;
    tableBody.appendChild(row);
  });
  
  // Update showing count safely
  const showingCountEl = document.getElementById("showingCount");
  const totalCountEl = document.getElementById("totalCount");
  
  if (showingCountEl) showingCountEl.textContent = `1-${Math.min(data.length, 70)}`;
  if (totalCountEl) totalCountEl.textContent = data.length;
}

function updateTable() {
  const searchInput = document.getElementById("countrySearch");
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.toLowerCase();
  
  const filteredData = emissionsData.filter((item) =>
    item.country.toLowerCase().includes(searchTerm)
  );

  filteredData.sort((a, b) => {
    const valA = a[currentSortColumn];
    const valB = b[currentSortColumn];

    if (typeof valA === "string") {
      return currentSortDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    
    return currentSortDirection === "asc" ? valA - valB : valB - valA;
  });

  renderTable(filteredData);
  updateSortIcons();
}

function updateSortIcons() {
  document.querySelectorAll(".sortable .sort-icon").forEach((icon) => {
    icon.classList.remove("fa-sort-up", "fa-sort-down");
    icon.classList.add("fa-sort");
  });

  const currentIcon = document.querySelector(`.sortable[data-sort="${currentSortColumn}"] .sort-icon`);
  if (currentIcon) {
    currentIcon.classList.remove("fa-sort");
    currentIcon.classList.add(currentSortDirection === "asc" ? "fa-sort-up" : "fa-sort-down");
  }
}

// FIXED: Made updateChart function global and safe
function updateChart(type = "total") {
  const chartCanvas = document.getElementById("co2Chart");
  if (!chartCanvas) return; // Exit if chart element doesn't exist
  
  currentChartType = type;
  const ctx = chartCanvas.getContext("2d");
  const top20 = emissionsData.slice(0, 20);

  let label, data, backgroundColor;

  switch (type) {
    case "total":
      label = "Total CO₂ Emissions (Mt)";
      data = top20.map((item) => item.total);
      backgroundColor = "rgba(64, 196, 200, 0.8)";
      break;
    case "perCapita":
      label = "Per Capita CO₂ Emissions (t)";
      data = top20.map((item) => item.perCapita);
      backgroundColor = "rgba(249, 237, 105, 0.8)";
      break;
    case "percent":
      label = "% of Global CO₂ Emissions";
      data = top20.map((item) => item.percent);
      backgroundColor = "rgba(255, 46, 99, 0.8)";
      break;
  }

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: top20.map((item) => item.country),
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: "rgba(255,255,255,0.2)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const country = top20[context.dataIndex];
              let value;
              switch (type) {
                case "total":
                  value = `${country.total.toLocaleString()} Mt (${country.percent}% of global)`;
                  break;
                case "perCapita":
                  value = `${country.perCapita} tons per person`;
                  break;
                case "percent":
                  value = `${country.percent}% of global emissions`;
                  break;
              }
              return `${country.country}: ${value}`;
            },
          },
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
          titleColor: '#eeeeee',
          bodyColor: '#eeeeee',
          borderColor: '#555555',
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: type === "total" ? "Metric Tons (millions)" : 
                  type === "perCapita" ? "Tons per person" : 
                  "% of Global Emissions",
            color: '#eeeeee',
          },
          ticks: {
            color: '#eeeeee',
            callback: (value) => (type === "percent" ? value + "%" : value.toLocaleString()),
          },
          grid: { color: 'rgba(238, 238, 238, 0.1)' },
        },
        x: {
          ticks: { color: '#eeeeee' },
          grid: { display: false },
        },
      },
    },
  });
}

// Make updateChart globally accessible
window.updateChart = updateChart;

// Initialize everything when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Initialize CO₂ counter if elements exist
  const co2Display = document.querySelector(".co2-number");
  if (co2Display) {
    updateCO2Display(currentCO2);
    
    // Update CO₂ counter every 500ms
    setInterval(() => {
      const noise = Math.random() * 0.0000001;
      currentCO2 += secRise + noise;
      updateCO2Display(currentCO2);
    }, 500);
  }

  // Initialize dashboard if elements exist
  const countryTable = document.getElementById("countryTable");
  if (countryTable) {
    renderTable(emissionsData);
    updateChart();

    // Setup search functionality
    const searchInput = document.getElementById("countrySearch");
    if (searchInput) {
      searchInput.addEventListener("input", updateTable);
    }

    // Setup table sorting
    document.querySelectorAll(".sortable").forEach((header) => {
      header.addEventListener("click", () => {
        const sortColumn = header.dataset.sort;
        if (currentSortColumn === sortColumn) {
          currentSortDirection = currentSortDirection === "asc" ? "desc" : "asc";
        } else {
          currentSortColumn = sortColumn;
          currentSortDirection = "asc";
        }
        updateTable();
      });
    });

    console.log("Dashboard loaded successfully with", emissionsData.length, "countries!");
  }
});