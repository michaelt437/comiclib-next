import { Publishers } from "../enums";

export interface Comicbook {
  [key: string]: any;
  id?: string;
  publisher: Publishers;
  score: number | null;
  status: boolean;
  title: string;
  writer: string;
}
