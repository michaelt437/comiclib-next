import { Publishers } from "../enums";

export interface IComic {
  publisher: Publishers;
  score: number | null;
  status: boolean;
  title: string;
  writer?: string;
}
