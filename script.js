async function getWeather(city) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=db92f4bc49d04e76b7e32218232709&q=${city}`,
    { mode: "cors" }
  );
  const promises = await response.json();
  return promises;
}

const handleErrors = (error) => {
  console.log("error");
};

const showData = (promises) => {
  console.log(promises.location.name, promises.current.temp_c, promises);
  const img = document.querySelector("img");
  img.src = promises.current.condition.icon;
};

getWeather("brasilia").then(showData).catch(handleErrors);
