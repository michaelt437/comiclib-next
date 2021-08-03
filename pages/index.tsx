import { useState } from "react";
import { IComic, Publishers, ReadStatus } from "../types";
import Layout from "../components/Layout";
import ComicsList from "../components/ComicsList/ComicsList";

export default function Home () {
  const [library, setComics] = useState<IComic[]>([
    {
      publisher: Publishers.MARVEL,
      score: 8,
      status: ReadStatus.COMPLETE,
      title: "Avengers vs X-Men"
    },
    {
      publisher: Publishers.MARVEL,
      score: 10,
      status: ReadStatus.COMPLETE,
      title: "Avengers: Disassembled"
    },
    {
      publisher: Publishers.VERTIGO,
      score: null,
      status: ReadStatus.NOTREAD,
      title: "The Sandman Vol 5: A Game of You"
    },
    {
      publisher: Publishers.IMAGE,
      score: null,
      status: ReadStatus.NOTREAD,
      title: "Black Science Vol 1"
    }
  ]);
  return (
    <Layout height="100%">
      <ComicsList items={library} />
    </Layout>
  );
}
