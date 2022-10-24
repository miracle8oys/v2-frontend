import { useState } from "react";
import Pagination from "../components/Pagination";
import ProductList from "../components/ProductList";
import useFetch from "../utilities/useFetch";
import { ProductType } from "../utilities/dataInterface";
import ProductForm from "../components/ProductForm";
import ProductEditForm from "../components/ProductEditForm";

interface FetchDataType {
  data: Array<ProductType>;
  error: null | string;
  totalData: number;
}

function Product() {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [changes, setChanges] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const [id, setId] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { data, error, totalData }: FetchDataType = useFetch(
    `/api/v2/product?keyword=${keyword}&offset=${
      (page - 1) * limit
    }&limit=${limit}`,
    changes
  );

  return (
    <div className="w-full pt-20">
      <div className="bg-slate-300 rounded-lg h-fit px-3 shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium pl-3 pt-5">Product List</h1>

          <div className="flex justify-end gap-5 py-5 px-3">
            <input
              type={"search"}
              placeholder="Search"
              onChange={(e) => {
                setKeyword(e.target.value);
                setPage(1);
              }}
              className="border-2 px-5 border-black py-1 rounded"
            />
            <div className="flex gap-2">
              <p className="font-semibold">Show</p>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value));
                  setPage(1);
                }}
                className="border-2 border-black rounded"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <p className="font-semibold">Entries</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="py-1 px-2 bg-blue-500 rounded text-white font-semibold"
            >
              + Insert Product
            </button>
          </div>
        </div>

        <hr className="border-gray" />

        <div className="w-full overflow-auto">
          <div className="flex flex-col">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden sm:rounded-lg">
                  <table className="min-w-full">
                    <thead className="bg-grey900 text-white">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-medium tracking-wider text-left text-gray-700"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-medium tracking-wider text-left text-gray-900"
                        >
                          Product ID
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-medium tracking-wider text-left text-gray-900"
                        >
                          Profit
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-medium tracking-wider text-left text-gray-900"
                        >
                          Stock
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-medium tracking-wider text-left text-gray-900"
                        >
                          Expired
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-medium tracking-wider text-left text-gray-900"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-lg font-medium tracking-wider text-left text-gray-900"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {error ? (
                        <tr>
                          <td colSpan={8} className="py-5 px-3">
                            {/* <ErrorModal error={"Data Tidak Ditemukan"} /> */}
                          </td>
                        </tr>
                      ) : (
                        data?.map((item, n) => (
                          <ProductList
                            n={n}
                            item={item}
                            offset={(page - 1) * limit}
                            key={item.id}
                            setId={setId}
                            setShowModal={setShowEditModal}
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

        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          totalData={totalData}
        />
      </div>
      <ProductForm
        setChanges={setChanges}
        showModal={showModal}
        setShowModal={setShowModal}
      />

      <ProductEditForm
        setChanges={setChanges}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        id={id}
        setId={setId}
      />
    </div>
  );
}

export default Product;
