import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Comicbook } from "../types";
import { User } from "@supabase/gotrue-js";
import supabase from "../supabase";
import Layout from "../components/Layout/Layout";
import Modal from "../components/Modal/Modal";
import ModalEdit from "../components/Modal/ModalEdit";
import WishlistTable from "../components/WishlistTable/WishlistTable";

export const getStatisProps: GetStaticProps = async () => {
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
  wishlistData: Partial<Comicbook>[];
}) {
  const [wishlist, setWishlist] = useState<Comicbook[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [editingBook, setEditingBook] = useState<Comicbook | null>(null);

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
    fetchWishlist();
    checkAuth();
  }, []);

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
    </Layout>
  );
}
