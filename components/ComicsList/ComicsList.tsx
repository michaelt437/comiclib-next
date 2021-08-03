import PropTypes from "prop-types";
import { IComic } from "../../types";

function ComicsList ({ items }: { items: IComic[] }) {
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
    <div className="row-span-1 col-span-full md:col-span-2">
      <div className="flex justify-between items-center flex-wrap mb-5 md:flex-nowrap">
        <h2 className="flex-shrink-0">Comics List</h2>
        <div className="flex-grow w-full md:max-w-lg md:ml-5">
          <input
            className="px-3 py-2 rounded-md w-full"
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex flex-auto items-stretch mb-5">
        <span className="cursor-pointer px-3 py-2 bg-gray-200 rounded-tl-md">
          All
        </span>
        <span className="cursor-pointer px-3 py-2 bg-gray-200">Marvel</span>
        <span className="cursor-pointer px-3 py-2 bg-gray-200">DC</span>
        <span className="cursor-pointer px-3 py-2 bg-sky-300">Vertigo</span>
        <span className="cursor-pointer px-3 py-2 bg-gray-200">Dark Horse</span>
        <span className="cursor-pointer px-3 py-2 bg-gray-200 rounded-tr-md">
          IDW
        </span>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Publisher</th>
            <th>Notes</th>
            <th className="text-center">Score</th>
            <th className="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((comic) => {
            return (
              <tr key={comic.title}>
                <td>{comic.title}</td>
                <td>{comic.publisher}</td>
                <td>{comic.notes}</td>
                <td className="text-center">{comic.score}</td>
                <td className="text-center">{statusIcon(comic.status)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

ComicsList.propTypes = {
  items: PropTypes.array
};

export default ComicsList;
