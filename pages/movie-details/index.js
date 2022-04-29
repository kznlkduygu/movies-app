import React from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import getConfig from "next/config";
import Genres from "../src/components/Genres";
import { IMAGES_API } from "../config/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export async function getServerSideProps({ query }) {
  const { id } = query;
  //Sayfada kullanılan veriler istek yapıldığı anda alınmak isteniyorsa getServerSideProps fonksiyonu içinde bu veriler alınıp sayfa render işlemi sunucuda yapılabilir. Buna server side rendering denir.
  // Türkiye’de yakında vizyona girecek filmleri listelemek için
  let moviesDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${publicRuntimeConfig.apiKey}&language=en-US`
  );
  moviesDetails = await moviesDetails.json();
  return {
    props: { moviesDetails: moviesDetails },
  };
}

function MovieDetails({ moviesDetails }) {

  return (
    <div key={moviesDetails.id}>
      <div className={styles.detailTitle}>
        <h2>
          {moviesDetails.title} - {moviesDetails.vote_average}
        </h2>
      </div>
      <div className={styles.description}>
        <div>
          <img
            src={IMAGES_API.w300 + moviesDetails.poster_path}
            alt={moviesDetails.title}
          ></img>
        </div>
        <div>
          <h6> {moviesDetails.overview}</h6>
        </div>
      </div>
      <Genres data={moviesDetails.id} />
    </div>
  );
}

export default MovieDetails;
