import { XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import supabase from "../../supabase";
import { Comicbook } from "../../types";

export default function ModalDelete ({
  changeDeleteModalState,
  bookToDelete,
  deleteBook
}: {
  changeDeleteModalState: Function;
  bookToDelete: Comicbook;
  deleteBook: Function;
}) {
  const router = useRouter();
  const [dbName, setDbName] = useState<string>("/");

  async function execDeleteBook () {
    await supabase.from(dbName).delete().match({ id: bookToDelete.id });
    deleteBook(bookToDelete.id);
    closeModal();
  }

  function closeModal (): void {
    changeDeleteModalState(false);
  }

  useEffect(() => {
    setDbName(router.pathname === "/" ? "comicbooks" : "wishlist");
  }, [router]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
      <div className="w-10/12 md:w-1/3 p-5 rounded-md bg-gray-100 z-30">
        <div className="flex justify-between items-center mb-5">
          <h3 className="uppercase">Delete</h3>
          <XIcon
            className="h-6 w-6 cursor-pointer shrink-0"
            onClick={closeModal}
          />
        </div>
        <p className="my-10">
          Are you sure you want to delete{" "}
          <span className="italic">{bookToDelete.title}</span>?
        </p>
        <div className="flex justify-end">
          <button className="btn secondary" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="btn primary"
            onClick={() => execDeleteBook(bookToDelete.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
