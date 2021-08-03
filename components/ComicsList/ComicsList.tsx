export default function ComicsList() {
  return (
    <div className="row-span-1 col-span-full md:col-start-2 md:col-end-4">
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
          Marvel
        </span>
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
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>House of M</td>
            <td>Marvel</td>
            <td></td>
            <td>10</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Black Hammer</td>
            <td>Dark Horse</td>
            <td></td>
            <td>10</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Batman: Black and White</td>
            <td>DC</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Sandman Vol 8</td>
            <td>Vertigo</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
