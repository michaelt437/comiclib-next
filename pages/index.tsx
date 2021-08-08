import { useEffect, useState } from "react";
import { IComic, Publishers, ReadStatus } from "../types";
import Layout from "../components/Layout";
import Modal from "../components/Modal/Modal";
import ComicsList from "../components/ComicsList/ComicsList";
import PublisherBarGraph from "../components/PublisherBarGraph/PublisherBarGraph";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SB_URL!,
  process.env.NEXT_PUBLIC_SB_PUBLIC_KEY!
);

export default function Home () {
  const [library, setLibrary] = useState<IComic[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBooks (): Promise<void> {
      const { data, error } = await supabase.from("comicbooks").select("*");
      setLibrary(data as IComic[]);
    }
    fetchBooks();
  }, []);

  return (
    <Layout>
      {openModal ? (
        <Modal changeModalState={(val: boolean) => setOpenModal(val)} />
      ) : null}
      <div className="flex flex-col rounded-md p-6 col-span-auto border border-gray-300">
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
