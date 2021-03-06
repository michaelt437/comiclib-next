import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { XIcon } from "@heroicons/react/solid";
import supabase from "../../supabase";
import { Comicbook, Publishers } from "../../types";

export default function Modal ({
  changeModalState,
  addNewBook
}: {
  changeModalState: Function;
  addNewBook: Function;
}) {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookPublisher, setBookPublisher] = useState<Publishers | string>(
    "default"
  );
  const [bookWriters, setBookWriters] = useState<string>("");
  const [bookScore, setBookScore] = useState<string | null>("0");
  const [bookReadStatus, setBookReadStatus] = useState<boolean>(false);
  const [dbName, setDbName] = useState<string>("/");

  async function addBook (): Promise<void> {
    let _newBook: Comicbook = {
      title: bookTitle,
      publisher: bookPublisher as Publishers,
      writer: bookWriters
    };

    if (router.pathname === "/") {
      _newBook = {
        ..._newBook,
        score: Number(bookScore) > 0 ? Number(bookScore) : null,
        status: bookReadStatus
      };
    }

    const { data, error } = await supabase.from(dbName).insert([
      {
        ..._newBook
      }
    ]);
    addNewBook(data![0]);
    closeModal();
  }

  function closeModal (): void {
    changeModalState(false);
  }

  function toggleStatus (): void {
    if (bookReadStatus) setBookScore(null);
    console.log("toggle status", bookReadStatus, bookScore);
    setBookReadStatus(!bookReadStatus);
  }

  useEffect(() => {
    setDbName(router.pathname === "/" ? "comicbooks" : "wishlist");
  }, [router]);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
      <div className="w-10/12 md:w-1/3 p-5 rounded-md bg-gray-100 z-30">
        <div className="flex justify-between items-center mb-5">
          <h3 className="uppercase">Add a new comic book</h3>
          <XIcon className="h-6 w-6 cursor-pointer" onClick={closeModal} />
        </div>
        <div className="form">
          <label htmlFor="title" className="block font-medium mb-1">
            Title*
          </label>
          <input
            value={bookTitle}
            className="form-field w-full mb-5"
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title"
            onChange={(event) => setBookTitle(event.target.value)}
          />
          <label htmlFor="publisher" className="block font-medium mb-1">
            Publisher*
          </label>
          <select
            value={bookPublisher}
            className="form-field w-full mb-5"
            id="publisher"
            name="publisher"
            onChange={(event) =>
              setBookPublisher(event.target.value as Publishers)
            }
          >
            <option value="default" disabled hidden>
              Select a publisher
            </option>
            <option value="Marvel">Marvel</option>
            <option value="DC">DC</option>
            <option value="Vertigo">Vertigo</option>
            <option value="Image">Image</option>
            <option value="Dark Horse">Dark Horse</option>
            <option value="IDW">IDW</option>
            <option value="Boom Studios">Boom Studios</option>
          </select>
          <label htmlFor="writer" className="block font-medium mb-1">
            Writer
          </label>
          <input
            value={bookWriters}
            className="form-field w-full mb-5"
            type="text"
            id="writer"
            name="writer"
            placeholder="Enter the writer(s)"
            onChange={(event) => setBookWriters(event.target.value)}
          />
          {router.pathname === "/" ? (
            <div className="flex">
              <div className="mr-10">
                <label htmlFor="readStatus" className="block font-medium mb-1">
                  <input
                    type="checkbox"
                    id="readStatus"
                    name="readStatus"
                    checked={bookReadStatus}
                    className="mr-2 mb-2"
                    onChange={() => toggleStatus()}
                  />
                  I have read this book
                </label>
              </div>
              <div className={bookReadStatus ? "" : "opacity-50"}>
                <label htmlFor="score" className="block font-medium mb-1">
                  Score{" "}
                  <span className="text-gray-400 font-normal">
                    (0 is no score)
                  </span>
                </label>
                <input
                  value={bookScore ? bookScore : 0}
                  className="form-field mb-5"
                  type="number"
                  id="score"
                  name="score"
                  min="0"
                  max="10"
                  placeholder="0"
                  disabled={!bookReadStatus}
                  onChange={(event) => setBookScore(event.target.value)}
                />
              </div>
            </div>
          ) : null}
          <div className="flex justify-end">
            <button className="btn secondary" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn primary" onClick={() => addBook()}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
