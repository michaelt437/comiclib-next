import { useEffect, useState } from "react";
import { Comicbook } from "../../types";

export default function MeanScore ({ data }: { data: Comicbook[]}) {
  const [meanScore, setMeanScore] = useState<number>(0);

  function getMean (numArr: number[]): number {
    const _total = numArr.reduce((acc, curr) => {
      return acc + curr;
    }, 0);

    return Number((_total / numArr.length).toFixed(2));
  }

  useEffect(() => {
    const _ratedBooks = data.filter(book => book.status);
    const _scores: number[] = _ratedBooks.map(book => book.score!);
    setMeanScore(getMean(_scores));
  }, [data]);
  
  return (
    <div className="rounded-md border border-blueGray-300 p-4 flex-1">
      <h3 className="mb-6">Mean Score</h3>
      <div className="text-sky-400 flex justify-center">
        <div className="text-5xl">{meanScore}</div>
      </div>
    </div>
  );
}