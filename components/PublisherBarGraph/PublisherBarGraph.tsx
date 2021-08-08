import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IComic, ITotalCounts, PublisherColors } from "../../types";

export default function PublisherBarGraph ({ data }: { data: IComic[] }) {
  const [totals, setTotals] = useState<ITotalCounts[]>();
  let [barData, setBarData] = useState<any>();
  let [barOptions, setBarOptions] = useState({
    scales: {
      x: {
        grid: {
          display: false
          // drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        grid: {
          // display: false,
          drawBorder: false
        },
        ticks: {
          // display: false
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
      const colorClasses = chartlabels.map(
        (publisher) =>
          PublisherColors[
            publisher
              .replace(/\ /, "")
              .toUpperCase() as keyof typeof PublisherColors
          ]
      );
      setBarData({
        labels: chartlabels,
        datasets: [
          {
            label: "Count",
            data: chartdata,
            backgroundColor: colorClasses,
            barThickness: 10,
            borderRadius: 4
          }
        ]
      });
    }

    extractLabelsAndData();
  }, [data]);

  return (
    <div className="col-start-3 col-end-4">
      <h2 className="mb-4">Distribution</h2>
      <Bar data={barData} options={barOptions} />
    </div>
  );
}
