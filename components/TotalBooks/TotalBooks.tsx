import { Comicbook } from "../../types";

export default function TotalBooks ({ data }: { data: Comicbook[] }) {
  return (
    <div className="rounded-md border border-slate-300 p-4 flex-1">
      <p className="h4 sm:h3 mb-6">Total Books</p>
      <div className="text-sky-400 flex justify-center">
        <div className="text-2xl sm:text-5xl">{data.length}</div>
      </div>
    </div>
  );
}
