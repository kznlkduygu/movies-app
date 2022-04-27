import React from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import getConfig from "next/config";
import Genres from "../src/components/Genres";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export async function getServerSideProps({ query }) {
  const { id } = query;
  //Sayfada kullanılan veriler istek yapıldığı anda alınmak isteniyorsa getServerSideProps fonksiyonu içinde bu veriler alınıp sayfa render işlemi sunucuda yapılabilir. Buna server side rendering denir.
  // Türkiye’de yakında vizyona girecek filmleri listelemek için
  let moviesDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${publicRuntimeConfig.apiKey}&language=en-US`
  );
  moviesDetails = await moviesDetails.json();
  console.log("moviesDetail", moviesDetails.pageProps);
  return {
    props: { moviesDetails: moviesDetails },
  };
}

function MovieDetails({ moviesDetails }) {
  const IMAGES_API = "https://image.tmdb.org/t/p/w300/";

  return (
    <div key={moviesDetails.index}>
      <div className={styles.detailTitle}>
        <h2>
          {moviesDetails.title} - {moviesDetails.vote_average}
        </h2>
      </div>
      <div className={styles.description}>
        <div>
          <img
            src={IMAGES_API + moviesDetails.poster_path}
            alt={moviesDetails.title}
          ></img>
        </div>
        <div>
          <h6> {moviesDetails.overview}</h6>

          <h4>
            {moviesDetails.release_date
              ? moviesDetails.release_date.substring(0, 4)
              : "-"}{" "}
          </h4>
        </div>
      </div>
      {moviesDetails.genres.map((data) => {
        <Genres data={data} />;
      })}
      <div></div>
    </div>
  );
}

export default MovieDetails;