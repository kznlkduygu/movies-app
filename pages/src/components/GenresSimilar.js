import React from "react";
import styles from "../../../styles/Home.module.css";

function GenresSimilar({ data }) {
  const IMAGES_API = "https://image.tmdb.org/t/p/w200/";
  return (
    <div className={styles.moviesDetailSimilar}>
    <div className={styles.moviesDetail} key={data.id}>
      <div className={styles.detailTitle}>
        <h2>
          {data.title} - {data.vote_average}
        </h2>
      </div>
      <div className={styles.description}>
        <div>
          <img src={IMAGES_API + data.poster_path} alt={data.title}></img>
        </div>
        <div>
          <h6> {data.overview}</h6>
        </div>
      </div>
    </div>
    </div>
  );
}

export default GenresSimilar;
