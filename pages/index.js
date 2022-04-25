import Head from "next/head";
import styles from "../styles/Home.module.css";
import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export default function Home(initialData) {
  return (
    <div className="container">
      <Head>
        <title>Movies App</title>
        <h1>Movies </h1>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>Main</div>
      </main>

      <footer className={styles.footer}>Footer</footer>
    </div>
  );
}
export async function getServerSideProps(context) {
  //Sayfada kullanılan veriler istek yapıldığı anda alınmak isteniyorsa getServerSideProps fonksiyonu içinde bu veriler alınıp sayfa render işlemi sunucuda yapılabilir. Buna server side rendering denir.
  return {
    props: {},
  };
}
