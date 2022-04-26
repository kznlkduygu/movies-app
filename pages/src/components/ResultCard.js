import React from "react";

export function ResultCard({ movie }) {
  return (
    <div>
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            alt={`${movie.title}`}
          />
        ) : (
          <div className="filler-poster"></div>
        )}
      </div>

      <div className="header">
        <h3 className="title">{movie.title} </h3>
        <h4 className="release-date">
          {movie.release_date ? movie.release_date.substring(0, 4) : "-"}{" "}
        </h4>
      </div>
    </div>
  );
}
