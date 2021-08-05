import { useEffect, useState } from "react";
import { IComic, Publishers, ReadStatus } from "../types";
import Layout from "../components/Layout";
import Modal from "../components/Modal/Modal";
import ComicsList from "../components/ComicsList/ComicsList";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://wwwhlgyjoggvjxbbycgn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODEwMDUwNCwiZXhwIjoxOTQzNjc2NTA0fQ.C2zMG2-CyTumjZPJWEKymbsYIHuCjyJpgK9lMj8euRY");

export default function Home() {
  const [library, setLibrary] = useState<IComic[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBooks(): Promise<void> {
      const { data, error } = await supabase.from("comicbooks").select("*");
      setLibrary(data as IComic[]);
    }
    fetchBooks();
  }, []);

  return (
    <Layout>
      {openModal ? <Modal changeModalState={(val: boolean) => setOpenModal(val)} /> : null}
      <ComicsList items={library} changeModalState={(val: boolean) => setOpenModal(val)} />
      <div className="flex flex-col rounded-md p-6 col-span-auto">
        <h2 className="mb-5">Stats</h2>
        <div className="flex flex-col flex-grow justify-center items-center">
          <p className="text-5xl">{library.length}</p>
          <p>Total</p>
        </div>
      </div>
      <div className="flex flex-col rounded-md p-6 col-span-auto">
        <h2 className="mb-5">Stats</h2>
        <div className="flex flex-col flex-grow justify-center items-center">
          <p className="text-5xl">142</p>
          <p>Total</p>
        </div>
      </div>
      <div className="flex flex-col rounded-md p-6 col-span-auto">
        <h2 className="mb-5">Stats</h2>
        <div className="flex flex-col flex-grow justify-center items-center">
          <p className="text-5xl">142</p>
          <p>Total</p>
        </div>
      </div>
    </Layout>
  );
}
