import { ProductType } from "../utilities/dataInterface";
import { FiEdit } from "react-icons/fi";

interface ProductListProps {
  item: ProductType;
  n: number;
  offset: number;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const dateConverter = (date: string) => {
  return date.split("T")[0];
};
function ProductList({
  item,
  n,
  offset,
  setId,
  setShowModal,
}: ProductListProps) {
  return (
    <tr key={item.id} className="bg-white odd:bg-tableOdd">
      <td className="py-2 px-6 text-md  font-medium text-gray-900 whitespace-nowrap">
        {n + 1 + offset}
      </td>
      <td className="py-2 px-6 text-md whitespace-nowrap">{item.product_id}</td>
      <td className="py-2 px-6 text-md whitespace-nowrap">Rp {item.profit}</td>
      <td className="py-2 px-6 text-md whitespace-nowrap">{item.stock}</td>
      <td className="py-2 px-6 text-md whitespace-nowrap">
        {dateConverter(item.expired)}
      </td>
      <td className="py-2 px-6 text-md whitespace-nowrap">
        {item.status ? (
          <span className="bg-lime-500 text-center py-1 px-2 whitespace-nowrap rounded-md font-semibold">
            Active
          </span>
        ) : (
          <span className="bg-red-500 text-center py-1 px-2 whitespace-nowrap rounded-md font-semibold">
            Inactive
          </span>
        )}
      </td>
      <td className="py-2 px-6 text-md  whitespace-nowrap">
        <button
          onClick={() => {
            setId(item.id!);
            setShowModal(true);
          }}
          className="text-black bg-yellow-600 text-2xl p-1 rounded"
        >
          <FiEdit />
        </button>
      </td>
    </tr>
  );
}

export default ProductList;
