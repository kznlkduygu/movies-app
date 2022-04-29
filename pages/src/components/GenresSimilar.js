import React from "react";
import styles from "../../../styles/Home.module.css";
import { IMAGES_API } from "../../config/config";

function GenresSimilar({ data }) {
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
            <img
              src={IMAGES_API.w200 + data.poster_path}
              alt={data.title}
            ></img>
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
