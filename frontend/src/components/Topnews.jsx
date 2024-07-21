import React, { useState, useEffect } from "react";
import styles from "./Topnews.module.css";
import { Link } from "react-router-dom";

function Topnews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topnews, setTopnews] = useState([]);

  // useEffect(() => {
  //   const getNews = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://newsdata.io/api/1/news?apikey=pub_48058e9f29dda5220791bffcb033ff240661a&q=wildlife"
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log("data", data);

  //       const filteredData = data.results.filter((item) => item.image_url);
  //       const top4News = filteredData.slice(0, 4);
  //       setTopnews(top4News);
  //     } catch (error) {
  //       console.error("Error fetching news data:", error);
  //     }
  //   };

  //   getNews();s
  // }, []);

  const images = [
    {
      quot: "Tiger is a symbol of beauty, bravery, strength, and Nationality so save the Tiger. save the Nation Pride.",
      img: "https://nationalzoo.si.edu/sites/default/files/newsroom/20190226-bridgetisrael08.jpg",
    },
    {
      quot: "Nature's great masterpiece, an elephant - the only harmless great thing.",
      img: "https://images.unsplash.com/photo-1449104532935-d9209c70e2b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quot: "The very fact that the jaguar can become extinct while the Pekingese survives indicates to me that someone hasn't thought this thing through.",
      img: "https://plus.unsplash.com/premium_photo-1664302951530-f329f4986976?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quot: "The rhino is now more or less extinct, and it's not because of global warming or shrinking habitats. It's because of Beyonce's handbags.",
      img: "https://images.unsplash.com/photo-1468560721961-0c42d2f9dcf9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quot: "Vultures are homely, but they clean up all the garbage and that's good. And they're elegant in the sky.",
      img: "https://sc0.blr1.cdn.digitaloceanspaces.com/article/161973-mlajxjhlnn-1627295060.jpg",
    },
  ];

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.cards}>
      <h1 className={styles.title}>Top News</h1>
      <div className={styles.newspart}>
        {topnews.length > 0 &&
          topnews.map((news, index) => (
            <div key={index} className={styles.news}>
              <div className={styles.left}>
                <img
                  src={
                    news.image_url
                      ? news.image_url
                      : "https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2024/07/breaking-news-template-5-1720141380-1720238248.jpg"
                  }
                  alt={news.title}
                />
              </div>
              <div className={styles.right}>
                <h1>
                  {news.title.length > 50
                    ? news.title.slice(0, 50)
                    : news.title}
                </h1>
                <h2>
                  {news.description && news.description.length > 100
                    ? news.description.slice(0, 100)
                    : news.description}
                </h2>
                <Link to={news.link}>
                  <p>Read More</p>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.books}>
        <div className={styles.container}>
          <div className={styles.leftcont}>
            <h1 className={styles.quot}>{images[currentIndex].quot}</h1>
          </div>
          <div className={styles.rightcont}>
            <div className={styles.slider}>
              <img
                src={images[currentIndex].img}
                alt={`Slide ${currentIndex + 1}`}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topnews;
