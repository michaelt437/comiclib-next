import { Publishers } from "../enums";

export interface IComic {
  id?: string;
  publisher: Publishers;
  score: number | null;
  status: boolean;
  title: string;
  writer: string;
}
