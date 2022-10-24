import { RecomendationType } from "../utilities/dataInterface";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

interface RecomendationsListProps {
  data: Array<RecomendationType>;
  handleStoreRecomendation: () => void;
}
const RecomendationsList = ({
  data,
  handleStoreRecomendation,
}: RecomendationsListProps) => {
  return (
    <div className="pt-7 pb-20 w-full">
      <div className="shadow-lg shadow-slate-500 border-2 rounded-lg bg-slate-300 h-fit px-3">
        <div className="py-5 px-3 flex justify-between items-center">
          <h1 className="text-xl font-medium">Recomendations</h1>
          {data.length > 0 && (
            <button
              onClick={handleStoreRecomendation}
              className="px-5 h-10 bg-blue-500 rounded font-semibold text-white"
            >
              Save
            </button>
          )}
        </div>
        <hr className="border-gray" />
        {/* {isLoading && <Loading />} */}

        <div className="w-full overflow-auto">
          <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden  sm:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-grey900  text-white">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-md font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-md font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Bundle Items Recomendations
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-md font-medium tracking-wider text-left text-gray-700 uppercase"
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
                            className="py-3 px-6 text-md font-medium tracking-wider text-left text-gray-700 uppercase"
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
                          <td className="py-1 px-6 text-md font-normal text-gray-900 border-2 border-slate-700">
                            {n + 1}
                          </td>
                          <td className="py-1 px-6 w-[30vw] text-md font-normal text-gray-900 border-2 border-slate-700">
                            {item.itemset.join(", ")}
                          </td>
                          <td className="py-1 px-6 text-md font-normal text-gray-900 border-2 border-slate-700">
                            {item.support.toFixed(3)}%
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
                            {/* <td className="py-2 px-6 text-md text-gray-900 border-2 border-slate-700">
                              {item.confidence.map((i, n) => (
                                <div key={n}>
                                  <p>{i.value.toFixed(2)}%</p>
                                </div>
                              ))}
                            </td> */}
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
      </div>
    </div>
  );
};

export default RecomendationsList;
