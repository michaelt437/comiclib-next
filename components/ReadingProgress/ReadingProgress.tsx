import { useEffect, useState } from "react";
import { Comicbook } from "../../types";

export default function ReadingProgress ({ data }: { data: Comicbook[] }) {
  const [readCount, setReadCount] = useState<number>(0);
  const [percentRead, setPercentRead] = useState<number>(0);

  useEffect(() => {
    if (data.length) {
      const _read = data.filter((comic) => comic.status).length;
      const _percent = Math.floor(100 * (_read / data.length));
      setReadCount(_read);
      setPercentRead(_percent);
    }
  }, [data]);

  return (
    <div className="rounded-md border border-slate-300 p-4 flex-1">
      <div className="flex justify-between items-center mb-6">
        <p className="h4 sm:h3 sm:shrink-0"><span className="hidden sm:inline-block">Reading</span> Progress</p>
        <span className="hidden sm:inline-block">
          <span className="font-bold">{readCount}</span>/{data.length}
        </span>
      </div>
      <div className="text-sky-400 flex justify-center">
        <span className="text-2xl sm:text-5xl">{percentRead}</span>
        <span className="text-lg sm:text-4xl">%</span>
      </div>
    </div>
  );
}
