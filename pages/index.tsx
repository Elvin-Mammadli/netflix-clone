import Head from "next/head";
import Image from "next/image";
import Banner from "../components/Banner";
import Header from "../components/Header";
import MovieSlider from "../components/MovieSlider";
import useAuth from "../hooks/useAuth";
import { iMovie } from "../typings";
import apiCalls from "../utils/apiCalls";
import { useRecoilValue } from 'recoil';
import Modal from "../components/Modal";
import { modalState } from "../atoms/modalAtoms";

interface iProps {
  netflixOriginals: [iMovie];
  trendingNow: [iMovie];
  topRated: [iMovie];
  actionMovies: [iMovie];
  comedyMovies: [iMovie];
  horrorMovies: [iMovie];
  romanceMovies: [iMovie];
  documentaries: [iMovie];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: iProps) => {
  const { loading } = useAuth();
  const modal = useRecoilValue(modalState);

  if(loading) {
    return null
  }

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <MovieSlider title="Trending Now" movies={trendingNow} />
          <MovieSlider title="Top Rated" movies={topRated} />
          <MovieSlider title="Action Thrillers" movies={actionMovies} />
          {/* My List Component */}
          <MovieSlider title="Comedies" movies={comedyMovies} />
          <MovieSlider title="Scary Movies" movies={horrorMovies} />
          <MovieSlider title="Romance Movies" movies={romanceMovies} />
          <MovieSlider title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {modal && <Modal />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(apiCalls.fetchNetflixOriginals).then((res) => res.json()),
    fetch(apiCalls.fetchTrending).then((res) => res.json()),
    fetch(apiCalls.fetchTopRated).then((res) => res.json()),
    fetch(apiCalls.fetchActionMovies).then((res) => res.json()),
    fetch(apiCalls.fetchComedyMovies).then((res) => res.json()),
    fetch(apiCalls.fetchHorrorMovies).then((res) => res.json()),
    fetch(apiCalls.fetchRomanceMovies).then((res) => res.json()),
    fetch(apiCalls.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      // products,
    },
  };
};
