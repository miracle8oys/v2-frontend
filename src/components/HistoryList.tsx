import { useState } from "react";
import mutateData from "../utilities/mutateData";
import { RecomendationType } from "../utilities/dataInterface";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

interface HistoryListProps {
  data: Array<RecomendationType>;
  createdAt: string;
  startDate: string;
  endDate: string;
  id: number;
  setChanges: React.Dispatch<React.SetStateAction<number>>;
}
const HistoryList = ({
  data,
  createdAt,
  id,
  setChanges,
  startDate,
  endDate,
}: HistoryListProps) => {
  const [showList, setShowList] = useState<boolean>(false);

  const handleDeleteHistory = () => {
    mutateData(`/api/v2/history/${id}`, {}, "DELETE").then(() =>
      setChanges((current) => current + 1)
    );
  };

  return (
    <div className="py-3 w-full">
      <div className="shadow-lg shadow-slate-500 rounded-lg bg-slate-300 h-fit px-3 border">
        <div className="py-5 px-3 flex justify-between items-center">
          <div
            onClick={() => setShowList((current) => !current)}
            className="text-xl font-medium py-5 hover:text-blue-700 cursor-pointer flex gap-7"
          >
            <span>Start Date: {new Date(startDate).toLocaleDateString()}</span>
            <span>End Date: {new Date(endDate).toLocaleDateString()}</span>
            <span>Generate At: {new Date(createdAt).toLocaleString()}</span>
          </div>
          <button
            onClick={handleDeleteHistory}
            className="text-white bg-red-700 px-3 font-semibold rounded h-12"
          >
            Delete
          </button>
        </div>
        <hr className="border-gray" />
        {/* {isLoading && <Loading />} */}
        {showList && (
          <div className="w-full overflow-auto">
            <div className="flex flex-col">
              <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                  <div className="overflow-hidden  sm:rounded-lg">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3 px-6 text-lg font-semibold tracking-wider text-left text-gray-700"
                          >
                            No
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-lg font-semibold tracking-wider text-left text-gray-700"
                          >
                            Bundle Item Recomendations
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 text-lg font-semibold tracking-wider text-left text-gray-700"
                          >
                            Support
                          </th>
                          <th
                            scope="col"
                            className="py-3 px-6 w-[25vw] text-md font-medium tracking-wider text-left text-gray-700 uppercase"
                          >
                            <div className="flex justify-between">
                              <p>Item Componen</p>
                              <p>Confidence</p>
                            </div>
                          </th>
                          {/* <th
                            scope="col"
                            className="py-3 px-6 text-lg font-semibold tracking-wider text-left text-gray-700"
                          >
                            Action
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={8} className="py-1 px-3">
                            {/* <Error error={"Data Tidak Ditemukan"} /> */}
                          </td>
                        </tr>
                        {data.map((item, n) => (
                          <tr key={n} className="bg-gray-50 odd:bg-tableOdd">
                            <td className="py-2 px-6 text-md font-normal text-gray-900 border-2 border-slate-700">
                              {n + 1}
                            </td>
                            <td className="py-2 px-6 text-md font-normal text-gray-900 border-2 border-slate-700">
                              {item.itemset.join(", ")}
                            </td>
                            <td className="py-2 px-6 text-md font-normal text-gray-900 border-2 border-slate-700">
                              {item.support.toFixed(2)}%
                            </td>
                            <td className="py-1 w-[15vw] text-md font-normal text-gray-900 border-2 border-slate-700">
                              {item.confidence.map((i, n) => (
                                <div key={n}>
                                  <div className="flex justify-between pt-1 px-2 pr-12">
                                    <p>{i.item}</p>
                                    <p className="font-semibold">
                                      {i.value.toFixed(2)}%
                                    </p>
                                  </div>
                                  {item.confidence.length !== n + 1 && (
                                    <h1 className="text-black bg-black">
                                      <hr className="bg-black text-black font-bold w-max" />
                                    </h1>
                                  )}
                                </div>
                              ))}
                            </td>
                            {/* <td className="py-2 px-6 text-md text-gray-500 whitespace-nowrap dark:text-gray-400">
                              <button className="p-2 bg-red-700 font-semibold text-white rounded">
                                Delete
                              </button>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryList;
