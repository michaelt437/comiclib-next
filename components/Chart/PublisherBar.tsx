import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IComic, ITotalCounts } from "../../types";

function PublisherBarGraph ({ data }: { data: IComic[] }) {
  let [barData, setBarData] = useState<any>();
  let [barOptions, setBarOptions] = useState({
    aspectRatio: 4,
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {}
      },
      y: {
        grid: {
          drawBorder: false
        },
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        intersect: false
      }
    }
  });

  useEffect(() => {
    async function getTotals (): Promise<ITotalCounts[]> {
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

    async function extractLabelsAndData (): Promise<void> {
      const totals = await getTotals();
      const chartlabels = totals.map((total) => total.publisher);
      const chartdata = totals.map((total) => total.count);

      setBarData({
        labels: chartlabels,
        datasets: [
          {
            label: "Count",
            data: chartdata,
            backgroundColor: ["#38BDF8", "#22D3EE"],
            barThickness: 30,
            borderRadius: 4
          }
        ]
      });
    }

    extractLabelsAndData();
  }, [data]);

  return (
    <div className="col-span-full p-6">
      <Bar data={barData} options={barOptions} />
    </div>
  );
}

export const MemoizedBar = React.memo(PublisherBarGraph);
