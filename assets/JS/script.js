// === Simulated Weekly CO₂ Data ===
// These are just example values based on increasing atmospheric CO₂ levels.
const weeklyCO2 = [428.5, 428.6, 428.7, 428.8, 428.9];

// Calculate how much CO₂ is rising every second (ppm/second)
const first = weeklyCO2[0]; // First value in the array
const last = weeklyCO2[weeklyCO2.length - 1]; // Last value
const weeks = weeklyCO2.length - 1;
const weeklyRise = (last - first) / weeks; // CO₂ rise per week
const dailyRise = weeklyRise / 7; // Per day
const secRise = dailyRise / (24 * 60 * 60); // Per second

// Starting point for CO₂ value
let currentCO2 = last; // or a custom starting value like 428.589104

/**
 * === update CO2 Display ===
 * This function updates the DOM to show the new CO₂ value
 * Each digit is animated to roll vertically if the digit changes
 */
function updateCO2Display(value) {
  // Convert CO₂ value to a string with 6 decimals (e.g. "428.593104")
  const digits = value.toFixed(6).replace(".", "").padStart(9, "0");
  const digitDivs = document.querySelectorAll(".co2-display .digit");

  for (let i = 0; i < digitDivs.length; i++) {
    let stack = digitDivs[i].querySelector(".digit-stack");
    const newDigit = digits[i];
    const oldDigit = stack ? stack.getAttribute("data-current") : null;

    // If no stack exists yet, create it for initial load
    if (!stack) {
      stack = document.createElement("span");
      stack.className = "digit-stack";
      stack.setAttribute("data-current", newDigit);
      stack.innerHTML = `<span>${newDigit}</span><span>${newDigit}</span>`;
      digitDivs[i].innerHTML = "";
      digitDivs[i].appendChild(stack);
      continue;
    }

    // Only animate if digit actually changes
    if (oldDigit !== newDigit) {
      // Stack will slide up to reveal new digit
      stack.innerHTML = `<span>${oldDigit}</span><span>${newDigit}</span>`;
      stack.style.transform = "translateY(0)";
      stack.setAttribute("data-current", newDigit);

      // Apply animation
      setTimeout(() => {
        stack.style.transform = "translateY(-1.2em)";
      }, 10);

      // After animation ends, reset stack
      setTimeout(() => {
        stack.innerHTML = `<span>${newDigit}</span><span>${newDigit}</span>`;
        stack.style.transition = "none"; // temporarily disable transition
        stack.style.transform = "translateY(0)";
        void stack.offsetWidth; // Force reflow (hack)
        stack.style.transition = ""; // re-enable
      }, 410);
    }
  }
}

// === Initial Setup When Page Loads ===
window.addEventListener("DOMContentLoaded", () => {
  // Ensure each digit container has a span inside
  document.querySelectorAll(".co2-display .digit").forEach((digitDiv) => {
    if (!digitDiv.querySelector(".digit-inner")) {
      const inner = document.createElement("span");
      inner.className = "digit-inner";
      inner.textContent = "0";
      digitDiv.appendChild(inner);
    }
  });

  // Set the initial CO₂ display
  updateCO2Display(currentCO2);

  // Update value every 500ms with a small random offset
  setInterval(() => {
    const noise = Math.random() * 0.0000001; // random small bump
    currentCO2 += secRise + noise; // simulate continuous growth
    updateCO2Display(currentCO2); // update display
  }, 500);
});