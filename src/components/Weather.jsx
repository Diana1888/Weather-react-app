import Card from './Card';
import Background from './Background';
import loadingGif from '../assets/loadingGif.gif';
import { useState, useEffect } from 'react';

const Weather = () => {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [data, setData] = useState({});
  const [backgroundPhoto, setBackgroundPhoto] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {

      if (lat && long) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
          );
          const result = await response.json();
          setData(result);

          console.log(result);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [lat, long]);

  return (
    <div className="container">
      {loading ? (
        <img className="loader" src={loadingGif} alt="Loading" />
      ) : data.notFound ? (
        <div>Not found</div>
      ) : (
        <>
          <Card weatherData={data} backgroundPhoto={backgroundPhoto} />
          <Background
            weatherData={data}
            setBackgroundPhoto={setBackgroundPhoto}
          />
        </>
      )}
    </div>
  );
};

export default Weather;
