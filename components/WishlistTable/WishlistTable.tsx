import { Comicbook, SortOrder } from "../../types";
import { PencilAltIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import { SortAscendingIcon, SortDescendingIcon } from "@heroicons/react/solid";
import { Fragment, useState, useReducer } from "react";

export default function WishlistTable ({
  items,
  auth,
  changeModalState,
  changeEditModalState,
  changeDeleteModalState
}: {
  items: Comicbook[];
  auth: boolean;
  changeModalState: Function;
  changeEditModalState: Function;
  changeDeleteModalState: Function;
}) {
  const [searchText, setSearchText] = useState<string>("");
  const initialSortState = {
    sortBy: "title",
    order: SortOrder.ASCENDING
  };
  const [sortState, dispatch] = useReducer(execSort, initialSortState);

  function execSort (state: any, { sortColumn }: { sortColumn: string }) {
    return {
      sortBy: sortColumn,
      order:
        state.sortBy === sortColumn
          ? state.order === SortOrder.DESCENDING
            ? SortOrder.ASCENDING
            : SortOrder.DESCENDING
          : SortOrder.ASCENDING
    };
  }

  function filteredItems (): Comicbook[] {
    return items
      .filter((book) => {
        return (
          book.title.toLowerCase().indexOf(searchText.toLowerCase().trim()) >
            -1 ||
          (book.writer &&
            book.writer.toLowerCase().indexOf(searchText.toLowerCase().trim()) >
              -1) ||
          book.publisher
            .toLowerCase()
            .indexOf(searchText.toLowerCase().trim()) > -1
        );
      })
      .sort((book1: Comicbook, book2: Comicbook) => {
        switch (sortState.sortBy) {
          case "title":
          case "writer":
          case "publisher":
            if (book1[sortState.sortBy]! > book2[sortState.sortBy]!) {
              return sortState.order === SortOrder.DESCENDING ? -1 : 1;
            } else if (book2[sortState.sortBy]! > book1[sortState.sortBy]!) {
              return sortState.order === SortOrder.DESCENDING ? 1 : -1;
            } else {
              return 0;
            }
          default:
            return 0;
        }
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
            <div
              className={`grid-table_col col-span-3 ${
                sortState.sortBy === "title" && "font-bold text-sky-800"
              }`}
              onClick={() => dispatch({ sortColumn: "title" })}
            >
              Title
              {sortState.sortBy === "title" &&
                (sortState.order === SortOrder.DESCENDING ? (
                  <SortDescendingIcon className="inline h-4 w-4 ml-1" />
                ) : (
                  <SortAscendingIcon className="inline h-4 w-4 ml-1" />
                ))}
            </div>
            <div
              className={`grid-table_col col-span-2 ${
                sortState.sortBy === "writer" && "font-bold text-sky-800"
              }`}
              onClick={() => dispatch({ sortColumn: "writer" })}
            >
              Writer
              {sortState.sortBy === "writer" &&
                (sortState.order === SortOrder.DESCENDING ? (
                  <SortDescendingIcon className="inline h-4 w-4 ml-1" />
                ) : (
                  <SortAscendingIcon className="inline h-4 w-4 ml-1" />
                ))}
            </div>
            <div
              className={`grid-table_col ${
                sortState.sortBy === "publisher" && "font-bold text-sky-800"
              }`}
              onClick={() => dispatch({ sortColumn: "publisher" })}
            >
              Publisher
              {sortState.sortBy === "publisher" &&
                (sortState.order === SortOrder.DESCENDING ? (
                  <SortDescendingIcon className="inline h-4 w-4 ml-1" />
                ) : (
                  <SortAscendingIcon className="inline h-4 w-4 ml-1" />
                ))}
            </div>
            {auth ? <div></div> : null}
          </div>
        </div>
        <div className="grid-table_tbody">
          {filteredItems().map((comic) => {
            return (
              <Fragment key={comic.title}>
                <div
                  className={`grid-table_row grid hover:bg-slate-50 hidden lg:grid ${
                    auth ? "grid-cols-7" : "grid-cols-6"
                  }`}
                  key={comic.title}
                >
                  <div className="grid-table_col col-span-3 text-sky-600 font-medium">
                    <a
                      href={`https://www.amazon.com/s?k=${encodeURIComponent(
                        comic.title
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {comic.title}
                    </a>
                  </div>
                  <div className="grid-table_col col-span-2">
                    {comic.writer}
                  </div>
                  <div className="grid-table_col">{comic.publisher}</div>
                  {auth ? (
                    <div className="flex items-center justify-center">
                      <PencilAltIcon
                        className="inline h-6 w-6 cursor-pointer opacity-50 hover:opacity-100"
                        onClick={() => changeEditModalState(true, comic)}
                      />
                      <TrashIcon
                        className="inline h-6 w-6 ml-3 cursor-pointer opacity-50 hover:opacity-100"
                        onClick={() => changeDeleteModalState(true, comic)}
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
