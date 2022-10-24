import { useState } from "react";
import useFetch from "../utilities/useFetch";
import TransactionNavbar from "../components/TransactionNavbar";
import TransactionList from "../components/TransactionList";
import { TransactionType } from "../utilities/dataInterface";
import TransactionForm from "../components/TransactionForm";

interface FetchTransactionType {
  data: Array<TransactionType>;
  totalData: number;
  error: string | null;
}
const Transaction = () => {
  const [startDate, setStartDate] = useState(
    new Date("2022-03-12").toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [changes, setChanges] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, error }: FetchTransactionType = useFetch(
    `/api/v2/transaction?startDate=${startDate}&endDate=${endDate}`,
    changes
  );

  return (
    <div className="pt-12 pb-20 w-full">
      <div className="shadow-lg rounded-lg bg-slate-300 h-fit px-3">
        <div className="py-5 px-3 flex justify-between">
          <h1 className="text-xl font-medium pt-[32px] pb-[24px]">
            Transactions
          </h1>
          <TransactionNavbar
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setShowModal={setShowModal}
          />
        </div>
        <hr className="border-gray" />
        {/* {isLoading && <Loading />} */}

        <div className="w-full overflow-auto">
          <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden  sm:rounded-lg">
                  <table className="min-w-full border-2">
                    <thead className="bg-grey900  text-white">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-semibold  tracking-wider text-left text-gray-700 uppercase"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-semibold  tracking-wider text-left text-gray-700 uppercase"
                        >
                          Item List
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-semibold  tracking-wider text-left text-gray-700 uppercase"
                        >
                          Transaction Date
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-semibold  tracking-wider text-left text-gray-700 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {error ? (
                        <tr>
                          <td colSpan={8} className="py-5 px-3">
                            {/* <Error error={"Data Tidak Ditemukan"} /> */}
                          </td>
                        </tr>
                      ) : (
                        data.map((item, n) => (
                          <TransactionList
                            item={item}
                            n={n}
                            key={n}
                            setChanges={setChanges}
                          />
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TransactionForm
        setChanges={setChanges}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </div>
  );
};

export default Transaction;
