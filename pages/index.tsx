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
    <Layout>
      <ComicsList items={library} />
      <div className="flex flex-col bg-gray-50 rounded-md p-6 col-span-auto">
        <h2 className="mb-5">Stats</h2>
        <div className="flex flex-col flex-grow justify-center items-center">
          <p className="text-5xl">142</p>
          <p>Total</p>
        </div>
      </div>
    </Layout>
  );
}
