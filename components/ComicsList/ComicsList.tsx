import { Comicbook, SortOrder } from "../../types";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { CheckIcon, PencilAltIcon, XIcon } from "@heroicons/react/outline";
import { SortAscendingIcon, SortDescendingIcon } from "@heroicons/react/solid";
import { useState, useReducer } from "react";

export default function ComicsList ({
  items,
  changeModalState,
  changeEditModalState,
  auth
}: {
  items: Comicbook[];
  changeModalState: Function;
  changeEditModalState: Function;
  auth: boolean;
}) {
  const [searchText, setSearchText] = useState<string>("");
  const initialSortState = {
    sortBy: "title",
    order: SortOrder.ASCENDING
  };

  const [sortState, dispatch] = useReducer(execSort, initialSortState);

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
          case "score":
            if (book1[sortState.sortBy]! > book2[sortState.sortBy]!) {
              return sortState.order === SortOrder.DESCENDING ? -1 : 1;
            } else if (book2[sortState.sortBy]! > book1[sortState.sortBy]!) {
              return sortState.order === SortOrder.DESCENDING ? 1 : -1;
            } else {
              return 0;
            }
          case "status":
            return sortState.order === SortOrder.DESCENDING
              ? Number(book1.status) - Number(book2.status)
              : Number(book2.status) - Number(book1.status);
          default:
            return 0;
        }
      });
  }

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

  return (
    <div className="rounded-md p-6 row-start-1 col-span-full">
      <div className="flex items-center flex-wrap mb-5 md:flex-nowrap">
        <h2 className="flex-shrink-0">Book List</h2>
        <div className="flex-grow w-full rounded-md lg:max-w-lg sm:max-w-xs sm:ml-auto sm:mr-4">
          <div className="relative">
            <input
              className="form-field w-full bg-gray-200 focus:bg-blueGray-50"
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <div
              className={`absolute w-5 h-5 right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${searchText ? "" : "hidden"
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
            className="btn primary"
            onClick={() => changeModalState(true)}
          >
            Add Book
          </button>
        ) : null}
      </div>
      <div className="grid-table">
        <div className="grid-table_thead bg-gray-100 hidden lg:block">
          <div
            className={`grid-table_row grid ${auth ? "grid-cols-10" : "grid-cols-9"
              }`}
          >
            <div
              className={`grid-table_col col-span-4 ${sortState.sortBy === "title" && "font-bold text-sky-800"
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
              className={`grid-table_col col-span-2 ${sortState.sortBy === "writer" && "font-bold text-sky-800"
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
              className={`grid-table_col ${sortState.sortBy === "publisher" && "font-bold text-sky-800"
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
            <div
              className={`grid-table_col text-center ${sortState.sortBy === "status" && "font-bold text-sky-800"
                }`}
              onClick={() => dispatch({ sortColumn: "status" })}
            >
              Status
              {sortState.sortBy === "status" &&
                (sortState.order === SortOrder.DESCENDING ? (
                  <SortDescendingIcon className="inline h-4 w-4 ml-1" />
                ) : (
                  <SortAscendingIcon className="inline h-4 w-4 ml-1" />
                ))}
            </div>
            <div
              className={`grid-table_col text-center ${sortState.sortBy === "score" && "font-bold text-sky-800"
                }`}
              onClick={() => dispatch({ sortColumn: "score" })}
            >
              Score
              {sortState.sortBy === "score" &&
                (sortState.order === SortOrder.DESCENDING ? (
                  <SortDescendingIcon className="inline h-4 h-4 ml-1" />
                ) : (
                  <SortAscendingIcon className="inline h-4 w-4 ml-1" />
                ))}
            </div>
            {auth ? <div></div> : null}
          </div>
        </div>
        <OverlayScrollbarsComponent>
          <div className="grid-table_tbody max-h-96">
            {filteredItems().map((comic) => {
              return (
                <>
                  <div
                    className={`grid-table_row grid hover:bg-blueGray-50 hidden lg:grid ${auth ? "grid-cols-10" : "grid-cols-9"
                      }`}
                    key={comic.title}
                  >
                    <div className="grid-table_col col-span-4 text-sky-600 font-medium">
                      {comic.title}
                    </div>
                    <div className="grid-table_col col-span-2">
                      {comic.writer}
                    </div>
                    <div className="grid-table_col">{comic.publisher}</div>
                    <div className="grid-table_col flex justify-center text-green-400">
                      {comic.status ? <CheckIcon className="h5 w-5" /> : ""}
                    </div>
                    <div className="grid-table_col text-center text-sky-600">
                      {comic.score}
                    </div>
                    {auth ? (
                      <div className="text-center">
                        <PencilAltIcon
                          className="inline h-6 w-6 cursor-pointer opacity-50 hover:opacity-100"
                          onClick={() => changeEditModalState(true, comic)}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="block lg:hidden p-3 mb-2 bg-white rounded-sm">
                    <p className="text-sky-600 font-medium">{comic.title}</p>
                    <p>{comic.writer}</p>
                    <p>{comic.publisher}</p>
                  </div>
                </>
              );
            })}
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
}
