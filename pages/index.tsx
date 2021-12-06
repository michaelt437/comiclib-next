import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Comicbook } from "../types";
import { User } from "@supabase/gotrue-js";
import supabase from "../supabase";
import Layout from "../components/Layout/Layout";
import Modal from "../components/Modal/Modal";
import ModalEdit from "../components/Modal/ModalEdit";
import ComicsList from "../components/ComicsList/ComicsList";
import DistributionMetrics from "../components/DistributionMetrics/DistributionMetrics";
import ReadingProgress from "../components/ReadingProgress/ReadingProgress";
import TotalBooks from "../components/TotalBooks/TotalBooks";
import MeanScore from "../components/MeanScore/MeanScore";

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase
    .from("comicbooks")
    .select("*")
    .order("title", { ascending: true });
  console.log("getStaticProps", data);
  return {
    props: {
      libraryData: data
    }
  };
};

export default function Home ({ libraryData }: { libraryData: Comicbook[] }) {
  const [library, setLibrary] = useState<Comicbook[]>([]);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Comicbook | null>(null);

  useEffect(() => {
    async function fetchBooks (): Promise<void> {
      const { data, error } = await supabase
        .from("comicbooks")
        .select("*")
        .order("title", { ascending: true });
      setLibrary(data as Comicbook[]);
    }
    async function checkAuth (): Promise<void> {
      const user = (await supabase.auth.user()) as User;
      if (user && user.role) setAuthenticated(user.role === "authenticated");
    }
    fetchBooks();
    checkAuth();
  }, []);

  return (
    <Layout layoutStyles="grid grid-cols-3 grid-rows-1 auto-cols-max gap-6">
      <ComicsList
        items={library}
        auth={authenticated}
        changeModalState={(val: boolean) => setOpenAddModal(val)}
        changeEditModalState={(val: boolean, book: Comicbook) => {
          setOpenEditModal(val);
          setEditingBook(book);
        }}
      />
      <div className="col-span-full p-6">
        <h2 className="mb-4">Stats</h2>
        <div className="flex justify-between flex-wrap md:flex-nowrap space-x-4">
          <TotalBooks data={library} />
          <ReadingProgress data={library} />
          <MeanScore data={library} />
        </div>
      </div>
      <DistributionMetrics data={library} />
      {openAddModal ? (
        <Modal
          changeModalState={(val: boolean) => setOpenAddModal(val)}
          addNewBook={(book: Comicbook) => setLibrary([book, ...library])}
        />
      ) : null}
      {openEditModal ? (
        <ModalEdit
          changeEditModalState={(val: boolean) => {
            setOpenEditModal(val);
            setEditingBook(null);
          }}
          editingBook={editingBook!}
          saveChanges={(bookId: string, updatedBook: Comicbook) => {
            setLibrary((prevState) => {
              const newLibrary = [...prevState];
              let saveBookIndex = newLibrary.findIndex(
                (book) => book.id === bookId
              );
              newLibrary[saveBookIndex] = {
                id: newLibrary[saveBookIndex].id,
                ...updatedBook
              };
              return newLibrary;
            });
          }}
        />
      ) : null}
    </Layout>
  );
}
