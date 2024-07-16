import { useEffect } from 'react';

const Background = ({ weatherData, setBackgroundPhoto }) => {
  const { name } = weatherData;

  useEffect(() => {
    async function searchApi(name) {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos/?query=${name}&client_id=${process.env.REACT_APP_UNSPLASH_KEY}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const randomPhoto =
            data.results[Math.floor(Math.random() * data.results.length)];
          if (randomPhoto && randomPhoto.urls) {
            setBackgroundPhoto(randomPhoto.urls.regular);
          } else {
            console.error('No photo URLs found.');
          }
        } else {
          console.error('No photos found for this query.');
        }
      } catch (err) {
        console.error(err);
      }
    }
    if (name) {
      searchApi(name);
    }
  }, [name]);

  return null;
};

export default Background;
