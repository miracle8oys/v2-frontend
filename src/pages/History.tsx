import { useState } from "react";
import HistoryList from "../components/HistoryList";
import useFetch from "../utilities/useFetch";
import { HistoryType } from "../utilities/dataInterface";

interface GetHistoryType {
  data: Array<HistoryType>;
}

function History() {
  const [changes, setChanges] = useState<number>(0);
  const { data }: GetHistoryType = useFetch(
    `/api/v2/history/miracle8oys`,
    changes
  );

  return (
    <div>
      <p className="text-center font-semibold text-2xl pb-7 pt-3">History</p>
      {data.map((i) => (
        <HistoryList
          id={i.id!}
          startDate={i.startDate}
          endDate={i.endDate}
          createdAt={i.createdAt}
          data={i.data}
          key={i.id}
          setChanges={setChanges}
        />
      ))}
    </div>
  );
}

export default History;
