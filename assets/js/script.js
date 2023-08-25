var lat;
var lon;
var Date = new Date();
var options = { weekday: "long" };
var dayName = Date.toLocaleDateString("tr-TR", options);
var month = Date.getMonth();
var year = Date.getFullYear();
var day = Date.getDate();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=dfd69baa0d2343c19b7934e237e8d9e2&lang=tr&units=metric`
      )
        .then((r) => r.json())
        .then((data) => {
          document.getElementById("dateNow").innerHTML = dayName;
          document.getElementById("DMY").innerHTML =
            day + "." + (month + 1) + "." + year;
          document.getElementById("location").innerHTML = data.name;
          if (data.wind.speed > 10.8) {
            document.getElementById("currentWeather").innerHTML = "Rüzgarlı";
            document.getElementById("currentWeatherImg").src =
              "./assets/img/ruzgarli.png";
            document.getElementById("main").style.backgroundImage =
              "url('./assets/img/ruzgarlibg.jpg')";
          } else if (data.weather[0].main == "Clear") {
            document.getElementById("currentWeather").innerHTML = "Açık";
            document.getElementById("currentWeatherImg").src =
              "./assets/img/gunesli.png";
            document.getElementById("main").style.backgroundImage =
              "url('./assets/img/guneslibg.jpg')";
          } else if (data.weather[0].main == "Rain") {
            document.getElementById("currentWeather").innerHTML = "Yağmurlu";
            document.getElementById("currentWeatherImg").src =
              "./assets/img/yagmurlu.png";
            document.getElementById("main").style.backgroundImage =
              "url('./assets/img/yagmurlubg.jpg')";
          } else if (data.weather[0].main == "Clouds") {
            document.getElementById("currentWeather").innerHTML = "Bulutlu";
            document.getElementById("currentWeatherImg").src =
              "./assets/img/bulutlu.png";
            document.getElementById("main").style.backgroundImage =
              "url('./assets/img/bulutlubg.jpg')";
          } else if (data.weather[0].main == "Snow") {
            document.getElementById("currentWeather").innerHTML = "Karlı";
            document.getElementById("currentWeatherImg").src =
              "./assets/img/karli.png";
            document.getElementById("main").style.backgroundImage =
              "url('./assets/img/karlibg.jpg')";
          }
          document.getElementById("currentWeatherTemp").innerHTML =
            data.main.temp;
          document.getElementById("currentWeatherHumidity").innerHTML =
            data.main.humidity;
          document.getElementById("currentWeatherWindSpeed").innerHTML =
            data.wind.speed;
          document.getElementById("currentWeatherFeelsLike").innerHTML =
            data.main.feels_like;
        })
        .catch((error) => {
          console.error("API isteği başarısız:", error);
        });
    },
    function (error) {
      console.error(
        "Konum bilgisi alınamadı. Lütfen tarayıcınızda konum bilgisine izin verin.:",
        error
      );
    }
  );
}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=dfd69baa0d2343c19b7934e237e8d9e2&lang=tr&units=metric`
      )
        .then((r) => r.json())
        .then((data) => {
          let x = 0;
          for (let index = 0; index < data.list.length; index += 8) {
            const dateString = data.list[index].dt_txt;
            const arry = dateString.split("");
            const year = arry[0] + arry[1] + arry[2] + arry[3];
            const month = arry[5] + arry[6];
            const day = arry[8] + arry[9];
            document.getElementById("day" + x).innerHTML =
              day + "." + month + "." + year;
            if (data.list[index].wind.speed > 10.8) {
              document.getElementById("day" + x + "Status").innerHTML =
                "Rüzgarlı";
              document.getElementById("day" + x + "Img").src =
                "./assets/img/ruzgarli.png";
              document.getElementById(
                "weeklyWeatherCard" + x
              ).style.backgroundImage = "url('./assets/img/ruzgarlibg.jpg')";
            } else if (data.list[index].weather[0].main == "Clear") {
              document.getElementById("day" + x + "Status").innerHTML = "Açık";
              document.getElementById("day" + x + "Img").src =
                "./assets/img/gunesli.png";
              document.getElementById(
                "weeklyWeatherCard" + x
              ).style.backgroundImage = "url('./assets/img/guneslibg.jpg')";
            } else if (data.list[index].weather[0].main == "Rain") {
              document.getElementById("day" + x + "Status").innerHTML =
                "Yağmurlu";
              document.getElementById("day" + x + "Img").src =
                "./assets/img/yagmurlu.png";
              document.getElementById(
                "weeklyWeatherCard" + x
              ).style.backgroundImage = "url('./assets/img/yagmurlubg.jpg')";
            } else if (data.list[index].weather[0].main == "Clouds") {
              document.getElementById("day" + x + "Status").innerHTML =
                "Bulutlu";
              document.getElementById("day" + x + "Img").src =
                "./assets/img/bulutlu.png";
              document.getElementById(
                "weeklyWeatherCard" + x
              ).style.backgroundImage = "url('./assets/img/bulutlubg.jpg')";
            } else if (data.list[index].weather[0].main == "Snow") {
              document.getElementById("day" + x + "Status").innerHTML = "Karlı";
              document.getElementById("day" + x + "Img").src =
                "./assets/img/karli.png";
              document.getElementById(
                "weeklyWeatherCard" + x
              ).style.backgroundImage = "url('./assets/img/karlibg.jpg')";
            }
            document.getElementById("day" + x + "Temp").innerHTML =
              data.list[index].main.temp;
            document.getElementById("day" + x + "Humidity").innerHTML =
              data.list[index].main.humidity;
            x++;
          }
        })
        .catch((error) => {
          console.error("API isteği başarısız:", error);
        });
    },
    function (error) {
      console.error(
        "Konum bilgisi alınamadı. Lütfen tarayıcınızda konum bilgisine izin verin.:",
        error
      );
    }
  );
}
