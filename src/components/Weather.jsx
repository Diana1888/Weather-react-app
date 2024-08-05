import Card from './Card';
import Background from './Background';
import cloudsGif from '../assets/cloudsGif.gif';
import { useState, useEffect } from 'react';

const Weather = () => {
  const [coords, setCoords] = useState({ lat: '', long: '' });
  const [data, setData] = useState({});
  const [backgroundPhoto, setBackgroundPhoto] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoords({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (coords.lat && coords.long) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/weather/?lat=${coords.lat}&lon=${coords.long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
          );
          const result = await response.json();
          setData(result);

          console.log(result);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [coords]);

  return (
    <div className="container">
      {isLoading && <img className="loader" src={cloudsGif} alt="Loading" />}
      {data && (
        <>
          <Card weatherData={data} backgroundPhoto={backgroundPhoto} />
          <Background
            weatherData={data}
            setBackgroundPhoto={setBackgroundPhoto}
          />
        </>
      )}
      {!data && <div>Not found</div>}
    </div>
  );
};

export default Weather;
