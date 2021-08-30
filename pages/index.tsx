import { useEffect, useState } from "react";
import { IComic } from "../types";
import supabase from "../supabase";
import Layout from "../components/Layout";
import Modal from "../components/Modal/Modal";
import ModalEdit from "../components/Modal/ModalEdit";
import ComicsList from "../components/ComicsList/ComicsList";
import DistributionMetrics from "../components/DistributionMetrics/DistributionMetrics";
import { MemoizedBar } from "../components/Chart/PublisherBar";
import { ReadStatusPieMemo } from "../components/Chart/ReadStatusPie";
import { User } from "@supabase/gotrue-js";
import { BookOpenIcon } from "@heroicons/react/outline";

export default function Home () {
  const [library, setLibrary] = useState<IComic[]>([]);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<IComic | null>(null);

  useEffect(() => {
    async function fetchBooks (): Promise<void> {
      const { data, error } = await supabase
        .from("comicbooks")
        .select("*")
        .order("title", { ascending: true });
      setLibrary(data as IComic[]);
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
        changeEditModalState={(val: boolean, book: IComic) => {
          setOpenEditModal(val);
          setEditingBook(book);
        }}
      />
      {/* <DistributionMetrics data={library} /> */}
      <div className="col-span-full p-6">
        <h2 className="mb-4">Stats</h2>
        <div className="flex justify-between flex-wrap md:flex-nowrap space-x-4">
          <div className="rounded-md border border-blueGray-300 p-4 flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="flex-shrink-0">Progress</h3>
              <span className="">
                <span className="font-bold">74</span>/174
              </span>
            </div>
            <div className="text-sky-400 flex justify-center">
              <span className="text-7xl">45</span>
              <span className="text-4xl">%</span>
            </div>
          </div>
          <div className="rounded-md border border-blueGray-300 p-4 flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="flex-shrink-0">Progress</h3>
              <span className="">
                <span className="font-bold">74</span>/174
              </span>
            </div>
            <div className="text-sky-400 flex justify-center">
              <span className="text-7xl">45</span>
              <span className="text-4xl">%</span>
            </div>
          </div>
          <div className="rounded-md border border-blueGray-300 p-4 flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h3 className="flex-shrink-0">Progress</h3>
              <span className="">
                <span className="font-bold">74</span>/174
              </span>
            </div>
            <div className="text-sky-400 flex justify-center">
              <span className="text-7xl">45</span>
              <span className="text-4xl">%</span>
            </div>
          </div>
        </div>
      </div>
      <DistributionMetrics data={library} />
      {openAddModal ? (
        <Modal
          changeModalState={(val: boolean) => setOpenAddModal(val)}
          addNewBook={(book: IComic) => setLibrary([book, ...library])}
        />
      ) : null}
      {openEditModal ? (
        <ModalEdit
          changeEditModalState={(val: boolean) => {
            setOpenEditModal(val);
            setEditingBook(null);
          }}
          editingBook={editingBook!}
          saveChanges={(bookId: string, updatedBook: IComic) => {
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
