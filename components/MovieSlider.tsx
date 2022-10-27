import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { iMovie } from "../typings";
import Thumbnail from "./Thumbnail";

interface iProps {
  title: string;
  //   movie: iMovie | DocumentData[];
  movies: iMovie[];
}

const MovieSlider = ({ title, movies }: iProps) => {
  const slider = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (slider.current) {
      const { scrollLeft, clientWidth } = slider.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      slider.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125
           group-hover:opacity-100 ${!isMoved && 'hidden'}`}
        />

        <div className="flex items-center space-x-0.5 overflow-x-scroll md:space-x-2.5 scrollbar-hide">
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          onClick={() => handleClick("right")}
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer transition hover:scale-125 group-hover:opacity-100"
        />
      </div>
    </div>
  );
};

export default MovieSlider;
