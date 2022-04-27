import React, { useState } from "react";
import styles from "../../../styles/Home.module.css";
import Link from "next/link";

export default function Movies({
  title,
  index,
  overview,
  poster_path,
  release_date,
  vote_average,
}) {
  const IMAGES_API = "https://image.tmdb.org/t/p/w500/";

  return (
    <>
      <Link
        href={{
          pathname: "/movie-details",
          query: { id: index },
        }}
      >
        <div className={styles.moviesPage} key={index}>
          <div className={styles.h3}>
            <h3>
              {title} - {vote_average}
            </h3>
          </div>

          <img src={IMAGES_API + poster_path} alt={title}></img>
          <div className={styles.overview}>
            {overview}
            <h4>{release_date ? release_date.substring(0, 4) : "-"} </h4>
          </div>
        </div>
      </Link>
    </>
  );
}
