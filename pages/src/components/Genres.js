import React, { useState } from "react";
import getConfig from "next/config";
import GenresSimilar from "../components/GenresSimilar";
import styles from "../../../styles/Home.module.css";

export default function Movies({ data }) {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  const [similarMovies, setSimilarMovies] = useState({});

  React.useEffect(() => {
    const fetchData = async () => {
      const resopnse = await fetch(
        `https://api.themoviedb.org/3/movie/${data}/similar?api_key=${publicRuntimeConfig.apiKey}&language=en-US&page=1`
      );
      const resopnseJson = await resopnse.json();
      setSimilarMovies(resopnseJson);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.results}>
        {similarMovies?.results?.map((data) => {
          return <GenresSimilar data={data} />;
        })}
      </div>
    </>
  );
}
