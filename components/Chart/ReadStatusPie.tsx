import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Comicbook } from "../../types";

function ReadStatusPie ({ data }: { data: Comicbook[] }) {
  let [pieData, setPieData] = useState<any>();
  let [pieOptions, setPieOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    rotation: 180,
    borderWidth: 1,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  });

  useEffect(() => {
    let readCount = 0;
    let unreadCount = 0;

    data.forEach((book) => {
      book.status ? readCount++ : unreadCount++;
    });

    setPieData({
      labels: ["Read", "Unread"],
      datasets: [
        {
          data: [readCount, unreadCount],
          backgroundColor: ["#38BDF8", "#D1D5DB"]
        }
      ]
    });
  }, [data]);
  return (
    <div className="col-span-1 p-6">
      <Pie data={pieData} options={pieOptions} />
    </div>
  );
}

export const ReadStatusPieMemo = React.memo(ReadStatusPie);
