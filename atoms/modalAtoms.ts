import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";
import { iMovie } from "../typings";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const movieState = atom<iMovie | DocumentData | null>({
  key: "movieState",
  default: null,
});
