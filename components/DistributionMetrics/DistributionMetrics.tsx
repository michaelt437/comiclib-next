import React, { useEffect, useState } from "react";
import { IComic, ITotalCounts } from "../../types";

function PublisherBarGraph ({ data }: { data: IComic[] }) {
  const [totals, setTotals] = useState<ITotalCounts[]>();

  useEffect(() => {
    function getTotals (): ITotalCounts[] {
      const totals: ITotalCounts[] = [];
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
    <div className="col-span-full p-6">
      <h2 className="mb-4">Distribution</h2>
      <div className="flex space-x-4">
        {totals?.map((publisher) => {
          return (
            <div
              className="p-6 flex-1 rounded-md border border-blueGray-300"
              key={publisher.publisher}
            >
              <>
                <p className="mb-0 text-gray-400">{publisher.publisher}</p>
                <h2>{publisher.count}</h2>
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const MemoizedBar = React.memo(PublisherBarGraph);
