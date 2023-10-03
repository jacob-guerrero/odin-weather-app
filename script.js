async function getWeather(city) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=db92f4bc49d04e76b7e32218232709&q=${city}`,
    { mode: "cors" }
  );
  const promises = await response.json();
  return promises;
}

const handleErrors = (error) => {
  console.log(error);
};

async function showData () {
  const promises = await getWeather(input.value);
  promises.error
    ? handleErrors(promises.error.message)
    : console.log(promises.location.name, promises.current.temp_c, promises);
  //const img = document.querySelector("img");
  //img.src = promises.current.condition.icon;
};

const input = document.querySelector(".input");
const searchBtn = document.querySelector(".search-btn");
const form = document.querySelector(".form-container");

searchBtn.addEventListener("click", () => {
  console.log(input.value);
  showData().catch(handleErrors);
});
form.onsubmit = (e) => {
  e.preventDefault();
  if (input.value !== "") {
    showData().catch(handleErrors);
  }
  input.blur();
};
