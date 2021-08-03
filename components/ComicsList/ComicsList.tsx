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
    <div className="rounded-md p-6 row-span-1 col-span-full md:col-span-2">
      <div className="flex justify-between items-center flex-wrap mb-5 md:flex-nowrap">
        <h2 className="flex-shrink-0">Book List</h2>
        <div className="flex-grow w-full md:max-w-lg md:ml-5">
          <input
            className="px-3 py-2 rounded-md w-full"
            type="text"
            placeholder="Search..."
          />
        </div>
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
                <td className="text-gray-800">{comic.title}</td>
                <td className={`text-${comic.publisher.toLowerCase()}`}>{comic.publisher}</td>
                <td>{comic.notes}</td>
                <td className="text-center text-sky-600">{comic.score}</td>
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
