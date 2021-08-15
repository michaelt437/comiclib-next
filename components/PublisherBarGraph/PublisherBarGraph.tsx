import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IComic, ITotalCounts, PublisherColors } from "../../types";

function PublisherBarGraph({ data }: { data: IComic[] }) {
  const [totals, setTotals] = useState<ITotalCounts[]>();
  let [barData, setBarData] = useState<any>();
  let [barOptions, setBarOptions] = useState({
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          // display: false
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  });

  useEffect(() => {
    function getTotals(): ITotalCounts[] {
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

    // async function extractLabelsAndData(): Promise<void> {
    //   const totals = await getTotals();
    //   const chartlabels = totals.map((total) => total.publisher);
    //   const chartdata = totals.map((total) => total.count);
    //   const colorClasses = chartlabels.map(
    //     (publisher) =>
    //       PublisherColors[
    //         publisher
    //           .replace(/\ /, "")
    //           .toUpperCase() as keyof typeof PublisherColors
    //       ] + "80"
    //   );
    //   setBarData({
    //     labels: chartlabels,
    //     datasets: [
    //       {
    //         label: "Books",
    //         data: chartdata,
    //         backgroundColor: colorClasses
    //         barThickness: 10,
    //         borderRadius: 4
    //       }
    //     ]
    //   });
    // }

    // extractLabelsAndData();
    setTotals(getTotals());
  }, [data]);

  return (
    <div className="col-span-full p-6">
      <h2 className="mb-4">Distribution</h2>
      {/* <div>
        <Bar data={barData} options={barOptions} />
      </div> */}
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
