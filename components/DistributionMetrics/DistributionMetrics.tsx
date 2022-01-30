import { useEffect, useState } from "react";
import { Comicbook, TotalCounts } from "../../types";
import { MemoizedBar } from "../Chart/PublisherBar";

export default function PublisherBarGraph ({ data }: { data: Comicbook[] }) {
  const [totals, setTotals] = useState<TotalCounts[]>();

  useEffect(() => {
    function getTotals (): TotalCounts[] {
      const totals: TotalCounts[] = [];
      data.forEach((book) => {
        let _publisherTracker = totals.find(
          (tracker) => tracker.publisher === book.publisher
        );
        if (_publisherTracker) {
          _publisherTracker.count += 1;
        } else {
          totals.push({ publisher: book.publisher, count: 1 });
        }
      });
      return totals;
    }

    setTotals(getTotals());
  }, [data]);

  return (
    <div className="col-span-full lg:p-6">
      <h2 className="mb-4">Distribution</h2>
      <div className="flex justify-between space-y-2 lg:space-y-0 lg:space-x-4 mb-6 flex-wrap lg:flex-nowrap">
        {totals?.map((publisher) => {
          return (
            <div
              className="p-6 w-full lg:w-1/5 rounded-md border border-slate-300"
              key={publisher.publisher}
            >
              <div className="flex justify-between items-center">
                <p className="mb-0 lg:text-gray-400">{publisher.publisher}</p>
                <p className="h4 lg:h2">{publisher.count}</p>
              </div>
            </div>
          );
        })}
      </div>
      <span className="hidden lg:block">
        <MemoizedBar data={data} />
      </span>
    </div>
  );
}
