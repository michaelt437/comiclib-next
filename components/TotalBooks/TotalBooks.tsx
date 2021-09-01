import { IComic } from "../../types";

export default function TotalBooks ({ data }: { data: IComic[] }) {
  return (
    <div className="rounded-md border border-blueGray-300 p-4 flex-1">
      <h3 className="mb-6">Total Books</h3>
      <div className="text-sky-400 flex justify-center">
        <div className="text-7xl">{data.length}</div>
      </div>
    </div>
  );
}