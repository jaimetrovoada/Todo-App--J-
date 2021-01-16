const apiKey = "cdf99154d54a9aa87cc06d687005ad20";

navigator.geolocation.getCurrentPosition(success, fail);

function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat.toFixed(
    2
  )}&lon=${lon.toFixed(2)}&appid=${apiKey}`;
  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = () => {
    let responseObj = JSON.parse(xhr.response);
    let weather = responseObj.weather[0].main;
    document.getElementById("weather").innerHTML = `weather: ${weather}`;
  };

  xhr.send();
}

function fail() {
  document.getElementById("weather").innerHTML = `couldn't get ur location`;
}
