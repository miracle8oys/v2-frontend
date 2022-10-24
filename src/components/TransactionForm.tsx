import { useState, useEffect } from "react";
import mutateData from "../utilities/mutateData";
import { TransactionType, ProductType } from "../utilities/dataInterface";
import customFetch from "../utilities/customFetch";

interface ProductFromProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setChanges: React.Dispatch<React.SetStateAction<number>>;
}

export default function TransactionForm({
  showModal,
  setShowModal,
  setChanges,
}: ProductFromProps) {
  const [listItems, setListItems] = useState<Array<string>>([]);
  const [optionsItems, setOptionsItems] = useState<Array<ProductType>>([]);
  const [date, setDate] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  useEffect(() => {
    if (keyword) {
      customFetch(
        `/api/v2/product-transactions?keyword=${keyword}&offset=0&limit=5`
      )
        .then((res) => setOptionsItems(res.data.rows))
        .catch((err) => console.log(err));
    }
  }, [keyword]);

  const handleAddListItems = (product_id: string) => {
    if (!listItems.includes(product_id)) {
      setListItems((current) => [...current, product_id]);
    }
  };

  const handleRemoveListItems = (product_id: string) => {
    setListItems((current) => current.filter((i) => i !== product_id));
  };

  const handleDateConverter = (date: Date | null) => {
    if (date) {
      setDate(
        `${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}`
      );
    }
  };

  const handleSubmit = () => {
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Forbindden Access");
      return false;
    }
    const body: TransactionType = {
      list_items: listItems,
      date,
    };

    mutateData("/api/v2/transaction", body, "POST").then(() => {
      setChanges((current) => current + 1);
    });

    handleClearInput();
  };

  const handleClearInput = () => {
    setShowModal(false);
    setListItems([]);
    setDate("");
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
                  <h3 className="text-xl font-semibold mt-1">
                    Insert Transaction
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClearInput}
                  >
                    <span className="text-primary">x</span>
                  </button>
                </div>
                {/*body*/}
                <div className="w-full">
                  <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4 ">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Item List
                      </label>
                      <div className="border-2 min-w-[20vw] min-h-[10vh]">
                        {listItems.map((i) => (
                          <div
                            key={i}
                            className="flex justify-between px-7 hover:bg-slate-200 hover:text-blue-700 cursor-pointer"
                          >
                            <p className="">{i}</p>
                            <span
                              className="hover:text-red-700 font-semibold"
                              onClick={() => handleRemoveListItems(i)}
                            >
                              X
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-5">
                        <div className="input-group relative flex items-stretch w-full">
                          <input
                            onChange={(e) => setKeyword(e.target.value)}
                            type="search"
                            className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2"
                          />
                          <button
                            className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                            type="button"
                            id="button-addon2"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="search"
                              className="w-4"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="w-full pt-1 shadow-md">
                        {optionsItems.map((i) => (
                          <div
                            className="hover:bg-slate-200 hover:text-blue-700 cursor-pointer pb-2 justify-start pl-3 rounded"
                            onClick={() => handleAddListItems(i.product_id)}
                            key={i.id}
                          >
                            <span>{i.product_id}</span>
                            {/* <span>
                              Exp: {new Date(i.expired).toLocaleDateString()}
                            </span>
                            <span>Profit: Rp.{i.profit}</span> */}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Transaction Date
                        </label>
                        <input
                          onChange={(e) =>
                            handleDateConverter(e.target.valueAsDate)
                          }
                          className="border border-gray focus:border-primary focus:outline-none w-full rounded py-2 px-3"
                          type="date"
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
