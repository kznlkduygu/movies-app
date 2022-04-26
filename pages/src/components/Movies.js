import React, { useState } from "react";
import { ResultCard } from "./ResultCard";
import getConfig from "next/config";
import styles from "../../../styles/Home.module.css";

export default function Movies() {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]); // api sonuçlarını depolamak için

  const onChange = async (e) => {
    e.preventDefault(); //tıklandığında bu eylemin engellenmesi gerekiyor ise kullanılır
    setQuery(e.target.value); // Girdinin değerini alır ne eklenirse event.target.value aracılığıyla erişilir
    let movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${publicRuntimeConfig.apiKey}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    ); // TMDB'den alınan movie API'si tanımlandı
    movies = await movies.json(); // içerik çıkarmak için json kullanıldı
    setResult(movies.results); // apiden çıkan veriler başta boş olan setResult'a set edildi.
  };

  return (
    <div>
      <div>
        <input
          className={styles.search}
          type="text"
          placeholder="Arama"
          name="search"
          value={query}
          onChange={onChange}
        />
      </div>
      {result?.length > 0 && (
        <div className={styles.results}>
          {result?.map((movie) => (
            <ul>
              <ResultCard movie={movie} />
            </ul>
          ))}
        </div>
      )}
    </div>
  );
}
