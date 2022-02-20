import { Publishers } from "../enums";

export interface Comicbook {
  [key: string]: any;
  publisher: Publishers;
  title: string;
  writer: string;
  id?: string;
  score?: number | null;
  status?: boolean;
}
