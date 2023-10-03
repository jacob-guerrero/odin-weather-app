const input = document.querySelector(".input");
const searchBtn = document.querySelector(".search-btn");
const form = document.querySelector(".form-container");
const info = document.querySelector(".weather-info");
const img = document.querySelector(".weather-icon");
const iconInfo = document.querySelector(".icon-info");

async function getWeather(city) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=db92f4bc49d04e76b7e32218232709&q=${city}`,
    { mode: "cors" }
  );
  const promises = await response.json();
  return promises;
}

async function showData() {
  const promises = await getWeather(input.value);
  img.classList.remove("weather-icon-filtered");

  if (promises.error) {
    handleErrors(promises.error.message);
  } else {
    console.log(promises.location.name, promises.current.temp_c, promises);
    const location = promises.location.name;
    const temp_c = promises.current.temp_c;
    const temp_f = promises.current.temp_f;
    const condition = promises.current.condition.text;
    const icon = promises.current.condition.icon;

    info.innerText = `The current weather in ${location} is ${temp_c}°C (${temp_f}°F)`;
    img.src = icon;
    iconInfo.innerText = `${condition}`;
  }
}

const handleErrors = (error) => {
  console.log(error);
};

/* Event Listeners */
searchBtn.addEventListener("click", () => {
  if (input.value !== "") {
    console.log(input.value);
    showData().catch(handleErrors);
  }
});
form.onsubmit = (e) => {
  e.preventDefault();
  if (input.value !== "") {
    showData().catch(handleErrors);
  }
  input.blur();
};
window.onload = async () => {
  const promises = await getWeather("auto:ip");
  img.classList.add("weather-icon-filtered");
  if (promises.current.is_day === 0) {
    img.src = "./img/clear_night.svg";
  } else {
    img.src = "./img/sunny.svg";
  }
};
