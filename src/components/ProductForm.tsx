import { useState } from "react";
import mutateData from "../utilities/mutateData";
import { ProductType } from "../utilities/dataInterface";

interface ProductFromProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setChanges: React.Dispatch<React.SetStateAction<number>>;
}

export default function ProductForm({
  showModal,
  setShowModal,
  setChanges,
}: ProductFromProps) {
  const [product_id, setProduct_id] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [expired, setExpired] = useState<string>("");
  const [profit, setProfit] = useState<number>(0);
  const [status, setStatus] = useState<boolean>(true);

  const handleExpiredConverter = (date: Date | null) => {
    if (date) {
      setExpired(
        `${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}`
      );
    }
  };

  const handleSubmit = () => {
    const body: ProductType = {
      product_id,
      expired,
      stock,
      profit,
      status,
    };

    mutateData("/api/v2/product", body, "POST").then((res) => {
      console.log(res);

      setChanges((current) => current + 1);
    });

    handleClearInput();
  };

  const handleClearInput = () => {
    setShowModal(false);
    setProduct_id("");
    setExpired("");
    setStock(0);
    setProfit(0);
    setStatus(true);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-white bg-opacity-30">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold mt-1">Insert Product</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClearInput}
                  >
                    <span className="text-primary">x</span>
                  </button>
                </div>
                {/*body*/}
                <div className="md:w-[25vw] w-[90vw]">
                  <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex justify-between">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Product ID
                        </label>
                        <input
                          value={product_id}
                          onChange={(e) => setProduct_id(e.target.value)}
                          className="border border-gray focus:border-primary focus:outline-none w-full rounded py-2 px-3"
                          type="text"
                          name="product_id"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Profit
                        </label>
                        <input
                          onChange={(e) =>
                            setProfit(e.target.valueAsNumber || 0)
                          }
                          className="border border-gray focus:border-primary focus:outline-none w-full rounded py-2 px-3"
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Stock
                        </label>
                        <input
                          onChange={(e) =>
                            setStock(e.target.valueAsNumber || 0)
                          }
                          className="border border-gray focus:border-primary focus:outline-none w-full rounded py-2 px-3"
                          type="number"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Expired
                        </label>
                        <input
                          onChange={(e) =>
                            handleExpiredConverter(e.target.valueAsDate)
                          }
                          className="border border-gray focus:border-primary focus:outline-none w-full rounded py-2 px-3"
                          type="date"
                        />
                      </div>
                    </div>
                    <div className="mb-4 flex justify-center w-full">
                      <div className="inline-flex gap-3">
                        <label className="block text-gray-700 text-sm font-bold">
                          Active
                        </label>
                        <input
                          value={"true"}
                          onChange={() => setStatus((current) => !current)}
                          className="border border-gray focus:border-primary focus:outline-none rounded p-3"
                          type="checkbox"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-gray rounded-b">
                  <button
                    className="text-red-500 background-transparent font-medium px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClearInput}
                  >
                    Tutup
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white active:bg-emerald-600 font-medium text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
