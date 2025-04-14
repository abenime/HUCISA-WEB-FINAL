const apiKey = "a5d3034c97922c5ded74a579e0dcee64";

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const icon = document.querySelector(".toggle-btn");
  icon.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

function loadTheme() {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
    document.querySelector(".toggle-btn").textContent = "☀️";
  }
}

async function getWeather() {
  const city = document.getElementById("citySelect").value;
  const resultDiv = document.getElementById("weatherResult");

  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a5d3034c97922c5ded74a579e0dcee64`
    );
    const data = await response.json();

    if (response.ok) {
      const temp = data.main.temp;
      const description = data.weather[0].description;
      const icon = data.weather[0].icon;

      resultDiv.innerHTML = `
        <p><span>${city}</span></p>
        <p>🌡 Temp: <strong>${temp}°F</strong></p>
        <p>🌥 Condition: <em>${description}</em></p>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
      `;
    } else {
      resultDiv.innerHTML = "City not found or API error.";
    }
  } catch (error) {
    resultDiv.innerHTML = "Error fetching data.";
    console.error(error);
  }
}

loadTheme();