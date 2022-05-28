import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Comicbook } from "../types";
import { User } from "@supabase/gotrue-js";
import supabase from "../supabase";
import Layout from "../components/Layout/Layout";
import Modal from "../components/Modal/Modal";
import ModalEdit from "../components/Modal/ModalEdit";
import ModalDelete from "../components/Modal/ModalDelete";
import WishlistTable from "../components/WishlistTable/WishlistTable";

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .order("title", { ascending: true });
  return {
    props: {
      wishlistData: data
    }
  };
};

export default function Wishlist ({
  wishlistData
}: {
  wishlistData: Comicbook[];
}) {
  const [wishlist, setWishlist] = useState<Comicbook[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Comicbook | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Comicbook | null>(null);

  async function deleteBook (bookId: string): Promise<void> {
    await supabase.from("wishlist").delete().match({ id: bookId });
    setWishlist((prevState) => {
      const _library = [...prevState];
      const bookToDeleteIndex = _library.findIndex(
        (book) => book.id === bookId
      );
      _library.splice(bookToDeleteIndex, 1);
      return _library;
    });
  }

  async function addBookToLibrary (comic: Comicbook): Promise<void> {
    let _newBook: Comicbook = {
      title: comic.title,
      publisher: comic.publisher,
      writer: comic.writer,
      score: 0,
      status: false
    };

    const { data, error } = await supabase
      .from("comicbooks")
      .insert([{ ..._newBook }]);
  }

  useEffect(() => {
    async function fetchWishlist (): Promise<void> {
      const { data, error } = await supabase
        .from("wishlist")
        .select("*")
        .order("title", { ascending: true });
      setWishlist(data as Comicbook[]);
    }
    async function checkAuth (): Promise<void> {
      const user = (await supabase.auth.user()) as User;
      if (user?.role) setAuthenticated(user.role === "authenticated");
    }

    setWishlist(wishlistData);
    checkAuth();
  }, [wishlistData]);

  return (
    <Layout>
      <WishlistTable
        items={wishlist}
        auth={authenticated}
        changeModalState={(val: boolean) => setOpenAddModal(val)}
        changeEditModalState={(val: boolean, book: Comicbook) => {
          setOpenEditModal(val);
          setEditingBook(book);
        }}
        changeDeleteModalState={(val: boolean, book: Comicbook) => {
          setOpenDeleteModal(val);
          setBookToDelete(book);
        }}
        addBookToLibrary={(comic: Comicbook) => addBookToLibrary(comic)}
        deleteBook={(bookId: string) => deleteBook(bookId)}
      />
      {openAddModal ? (
        <Modal
          changeModalState={(val: boolean) => setOpenAddModal(val)}
          addNewBook={(book: Comicbook) => setWishlist([book, ...wishlist])}
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
            setWishlist((prevState) => {
              const newWishlist = [...prevState];
              let saveBookIndex = newWishlist.findIndex(
                (book) => book.id === bookId
              );
              newWishlist[saveBookIndex] = {
                id: newWishlist[saveBookIndex].id,
                ...updatedBook
              };
              return newWishlist;
            });
          }}
        />
      ) : null}
      {openDeleteModal ? (
        <ModalDelete
          changeDeleteModalState={(val: boolean) => setOpenDeleteModal(val)}
          bookToDelete={bookToDelete!}
          deleteBook={(bookId: string) => {}}
        />
      ) : null}
    </Layout>
  );
}
