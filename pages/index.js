import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import getConfig from "next/config";
import Movies from "./src/components/Movies";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Home(initialData) {
  // başlangıçta boş bir dizi oluşturuldu ardından useEffect ile initialData yüklendiği anda verilerin yüklenmesi sağlandı
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [lastFiveSearches, setLastFiveSearches] = useState([]);
  const [suggestion, setShowSuggestion] = useState();

  useEffect(() => {
    setSearchResults(initialData.movies.results);
  }, [initialData]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value }); // input objesi açılarak name arrayine değer atanır
    setSearchTerm(e.target.value); //girilen karakter change ettiği anda kontrol edilip inputun değerine atanır
  };

  const handleFocus = (e) => {
    setShowSuggestion(true);
  };
  const handleBlur = (e) => {
    setShowSuggestion(false);
  };

  const onChangeSearch = async (e) => {
    setLastFiveSearches([...lastFiveSearches, input.searchTerm]); // son beş arama için lastFiveSearches set edilip sonradan aranan(input.search) değerler ile birleştirip bir array oluşturuldu
    e.preventDefault(); //tıklandığında bu eylemin engellenmesi gerekiyor ise kullanılır
    let movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${publicRuntimeConfig.apiKey}&language=en-US&page=1&include_adult=false&query=${input.searchTerm}`
    ); // TMDB'den alınan movie API'si tanımlandı
    movies = await movies.json(); // içerik çıkarmak için json kullanıldı
    setSearchResults(movies.results); // apiden çıkan veriler başta boş olan setSearchResults'a set edildi.
  };

  return (
    <div className="container">
      <div className={styles.background}>
        <h1 className={styles.h1}>MOVIES APP</h1>
        <Head>
          <title>Movies App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div class>
          <form onSubmit={onChangeSearch}>
            <input
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={styles.search}
              type="text"
              placeholder="Search.."
              name="searchTerm"
              value={searchTerm}
              onChange={handleChange}
            />
          </form>
          {suggestion === true ? (
            <>
              <div class={styles.dropdown}>
                <ul>
                  {lastFiveSearches.map((list) => (
                    <p>{list}</p>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            " "
          )}
        </div>

        <div className={styles.results}>
          {searchResults?.map((data, index) => {
            return (
              <Movies
                index={data.id}
                title={data.title}
                poster_path={data.poster_path}
                overview={data.overview}
                release_date={data.release_date}
                vote_average={data.vote_average}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  //Sayfada kullanılan veriler istek yapıldığı anda alınmak isteniyorsa getServerSideProps fonksiyonu içinde bu veriler alınıp sayfa render işlemi sunucuda yapılabilir. Buna server side rendering denir.
  // Türkiye’de yakında vizyona girecek filmleri listelemek için
  let movies = await fetch(`
  https://api.themoviedb.org/3/movie/upcoming?api_key=${serverRuntimeConfig.apiKey}&language=en-US&page=1`);
  movies = await movies.json();
  return {
    props: { movies: movies },
  };
}
