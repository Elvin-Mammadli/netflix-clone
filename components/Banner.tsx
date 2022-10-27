import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { iMovie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtoms";

interface iProps {
  netflixOriginals: iMovie[];
}

const Banner = ({ netflixOriginals }: iProps) => {
  const [movie, setMovie] = useState<iMovie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currMovie, setCurrMovie] = useRecoilState(movieState);

  //   const {} = netflixOriginals;

  useEffect(() => {
    const randomPoster =
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)];
    setMovie(randomPoster);
  }, []);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="movie poster"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs drop-shadow-xl text-xs md:text-lg md:max-w-lg lg:text-2xl lg:max-w-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerBtn bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerBtn bg-[gray]/70"
          onClick={() => {
            setCurrMovie(movie);
            setShowModal(true);
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
