import { Publishers, ReadStatus } from "../enums";

export interface IComic {
  publisher: Publishers;
  score: number | null;
  status: ReadStatus;
  title: string;
  writer?: string;
}
