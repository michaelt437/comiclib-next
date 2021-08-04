import { IComic } from "../../types";

export default function ComicsList({ items }: { items: IComic[] }) {
  const statusIcon = function (status: number): string {
    switch (status) {
      case 0:
        return "😅";
      case 1:
        return "📖";
      case 2:
        return "✔";
      default:
        return "";
    }
  };
  return (
    <div className="rounded-md p-6 row-span-1 col-span-full md:col-span-2">
      <div className="flex justify-between items-center flex-wrap mb-5 md:flex-nowrap">
        <h2 className="flex-shrink-0">Book List</h2>
        <div className="flex-grow w-full rounded-md md:max-w-lg md:ml-5">
          <input
            className="px-3 py-2 rounded-md w-full bg-gray-200 focus:bg-blueGray-50"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="grid-table">
        <div className="grid-table_thead">
          <div className="grid-table_row grid grid-cols-8">
            <div className="grid-table_col col-span-4">Title</div>
            <div className="grid-table_col">Writer</div>
            <div className="grid-table_col">Publisher</div>
            <div className="grid-table_col text-center">Score</div>
            <div className="grid-table_col text-center">Status</div>
          </div>
        </div>
        <div className="grid-table_tbody">
          {items.map((comic) => {
            return (
              <div
                className="grid-table_row grid grid-cols-8 hover:bg-blueGray-50"
                key={comic.title}
              >
                <div className="grid-table_col col-span-4 text-sky-700">
                  {comic.title}
                </div>
                <div className="grid-table_col">{comic.writer}</div>
                <div className="grid-table_col">{comic.publisher}</div>
                <div className="grid-table_col text-center text-sky-600">
                  {comic.score}
                </div>
                <div className="grid-table_col text-center">
                  {statusIcon(comic.status)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
