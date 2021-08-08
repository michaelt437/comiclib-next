import { useEffect, useState } from "react";
import { IComic } from "../types";
import supabase from "../supabase";
import Layout from "../components/Layout";
import Modal from "../components/Modal/Modal";
import ComicsList from "../components/ComicsList/ComicsList";
import PublisherBarGraph from "../components/PublisherBarGraph/PublisherBarGraph";

export default function Home () {
  const [library, setLibrary] = useState<IComic[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    console.log("user", supabase.auth.user());
    async function fetchBooks (): Promise<void> {
      const { data, error } = await supabase.from("comicbooks").select("*");
      setLibrary(data as IComic[]);
    }
    fetchBooks();
  }, []);

  return (
    <Layout layoutStyles="grid grid-cols-3 grid-rows-1 auto-cols-max gap-6">
      {openModal ? (
        <Modal changeModalState={(val: boolean) => setOpenModal(val)} />
      ) : null}
      <div className="flex flex-col rounded-md p-6 col-span-auto">
        <h2 className="mb-5">Stats</h2>
        <div className="flex flex-col flex-grow justify-center items-center">
          <p className="text-5xl">{library.length}</p>
          <p>Total</p>
        </div>
      </div>
      <PublisherBarGraph data={library} />
      <ComicsList
        items={library}
        changeModalState={(val: boolean) => setOpenModal(val)}
      />
    </Layout>
  );
}
