import { Comicbook } from "../../types";
import { PencilAltIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";

export default function WishlistTable ({
  items,
  auth,
  changeModalState,
  changeEditModalState
}: {
  items: Comicbook[];
  auth: boolean;
  changeModalState: Function;
  changeEditModalState: Function;
}) {
  const [searchText, setSearchText] = useState<string>("");
  function filteredItems (): Comicbook[] {
    return items.filter((book) => {
      return (
        book.title.toLowerCase().indexOf(searchText.toLowerCase().trim()) >
          -1 ||
        (book.writer &&
          book.writer.toLowerCase().indexOf(searchText.toLowerCase().trim()) >
            -1) ||
        book.publisher.toLowerCase().indexOf(searchText.toLowerCase().trim()) >
          -1
      );
    });
  }

  return (
    <div className="rounded-md lg:p-6 row-start-1 col-span-full">
      <div className="flex items-center flex-wrap mb-5 md:flex-nowrap">
        <h2 className="shrink-0">Wishlist</h2>
        <div className="flex flex-grow justify-space-between items-center mt-2 sm:mt-0">
          <div
            className={`flex-grow w-full rounded-md lg:max-w-lg sm:max-w-xs sm:ml-auto ${
              auth && "mr-4"
            }`}
          >
            <div className="relative">
              <input
                className="form-field w-full bg-gray-200 focus:bg-slate-50"
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
              <div
                className={`absolute w-5 h-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                  searchText ? "" : "hidden"
                }`}
                title="Clear search"
                onClick={() => setSearchText("")}
              >
                <XIcon></XIcon>
              </div>
            </div>
          </div>
          {auth ? (
            <button
              className="btn primary flex-shrink-0"
              onClick={() => changeModalState(true)}
            >
              Add Book
            </button>
          ) : null}
        </div>
      </div>
      <div className="grid-table">
        <div className="grid-table_thead bg-gray-100 hidden lg:block">
          <div
            className={`grid-table_row grid ${
              auth ? "grid-cols-7" : "grid-cols-6"
            }`}
          >
            <div className="grid-table_col col-span-3">Title</div>
            <div className="grid-table_col col-span-2">Writer</div>
            <div
              className={`grid-table_col
              `}
            >
              Publisher
            </div>
            {auth ? <div></div> : null}
          </div>
        </div>
        <div className="grid-table_tbody">
          {items.map((comic) => {
            return (
              <Fragment key={comic.title}>
                <div
                  className={`grid-table_row grid hover:bg-slate-50 hidden lg:grid ${
                    auth ? "grid-cols-7" : "grid-cols-6"
                  }`}
                  key={comic.title}
                >
                  <div className="grid-table_col col-span-3 text-sky-600 font-medium">
                    {comic.title}
                  </div>
                  <div className="grid-table_col col-span-2">
                    {comic.writer}
                  </div>
                  <div className="grid-table_col">{comic.publisher}</div>
                  {auth ? (
                    <div className="text-center">
                      <PencilAltIcon
                        className="inline h-6 w-6 cursor-pointer opacity-50 hover:opacity-100"
                        onClick={() => changeEditModalState(true, comic)}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="block lg:hidden p-3 mb-2 bg-white rounded-lg">
                  <p className="text-sky-600 font-medium">{comic.title} </p>
                  <p>{comic.publisher}</p>
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
