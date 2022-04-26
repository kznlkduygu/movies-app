import React from "react";
import styles from "../../../styles/Home.module.css";

export function ResultCard({ movie }) {
  return (
    <div>
      <div className={styles.moviesPage}>
        {movie.poster_path ? (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={`${movie.title}`}
            />
            <div className={styles.overview}>{movie.overview}</div>
          </>
        ) : (
          <div className="poster"></div>
        )}
      </div>

      <div>
        <h3>{movie.title} </h3>
        <h4>
          {movie.release_date ? movie.release_date.substring(0, 4) : "-"}{" "}
        </h4>
      </div>
    </div>
  );
}
