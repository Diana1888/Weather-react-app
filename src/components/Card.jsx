import dayjs from 'dayjs';

const Card = ({ weatherData, backgroundPhoto }) => {
  if (!weatherData || !weatherData.main || !weatherData.weather) {
    return null;
  }

  const { name, main, weather } = weatherData;

  const currentTemp = main.temp;

  const backgroundGradient = () => {
    if (currentTemp < -10) {
      return 'linear-gradient(to right, #004ff9, #000000)';
    }
    if (currentTemp < 0) {
      return 'linear-gradient(to right, #62cff4, #2c67f2)';
    }
    if (currentTemp < 10) {
      return 'linear-gradient(to right, #abdcff, #0396ff)';
    }
    if (currentTemp < 20) {
      return 'linear-gradient(to right, #f1a7f1, #fad0c4)';
    }
    if (currentTemp < 30) {
      return 'linear-gradient(to right, #c5f9d7, #f7d486, #f27a7d)';
    }
    if (currentTemp < 40) {
      return 'linear-gradient(to right, #fe5f75, #fc9840)';
    }
    return 'linear-gradient(to right, #ffffff, #d4dfed)';
  };

  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${backgroundPhoto}), ${backgroundGradient()}`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="weather-main">
        <p className="weather-temp">{currentTemp.toFixed(0)}°</p>
        <p className="weather-city">{name.toUpperCase()}</p>
      </div>
      <div className="weather-info">
        <p className="weather-date">{dayjs().format('dddd, DD MMM')}</p>
        <div className="weather-sub-info">
          <div className="weather-condition">
            <p className="weather-desc">{weather[0].description}</p>
            <p className="weather-desc">
              <span>{main.temp_min.toFixed(0)}° / </span>
              {main.temp_max.toFixed(0)}°
            </p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
