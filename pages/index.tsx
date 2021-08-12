import { useEffect, useState } from "react";
import { IComic } from "../types";
import supabase from "../supabase";
import Layout from "../components/Layout";
import Modal from "../components/Modal/Modal";
import ComicsList from "../components/ComicsList/ComicsList";
import { MemoizedBar } from "../components/PublisherBarGraph/PublisherBarGraph";
import { User } from "@supabase/gotrue-js";

export default function Home() {
  const [library, setLibrary] = useState<IComic[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBooks(): Promise<void> {
      const { data, error } = await supabase
        .from("comicbooks")
        .select("*")
        .order("title", { ascending: true });
      setLibrary(data as IComic[]);
    }
    async function checkAuth(): Promise<void> {
      const user = (await supabase.auth.user()) as User;
      if (user && user.role) setAuthenticated(user.role === "authenticated");
    }
    fetchBooks();
    checkAuth();
  }, []);

  return (
    <Layout layoutStyles="grid grid-cols-3 grid-rows-1 auto-cols-max gap-6">
      {openModal ? (
        <Modal changeModalState={(val: boolean) => setOpenModal(val)} />
      ) : null}
      <ComicsList
        items={library}
        auth={authenticated}
        changeModalState={(val: boolean) => setOpenModal(val)}
      />
      <MemoizedBar data={library} />
    </Layout>
  );
}
