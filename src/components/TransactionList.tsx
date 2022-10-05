import { TransactionType } from "../utilities/dataInterface";
import mutateData from "../utilities/mutateData";

interface TransactionListProps {
  n: number;
  item: TransactionType;
  setChanges: React.Dispatch<React.SetStateAction<number>>;
}

function TransactionList({ item, n, setChanges }: TransactionListProps) {
  const handleDeleteTransaction = (id: number) => {
    mutateData(`/api/v2/transaction/${id}`, {}, "DELETE").then(() =>
      setChanges((current) => current + 1)
    );
  };

  return (
    <tr key={n} className="bg-white odd:bg-tableOdd">
      <td className="py-2 px-6 text-md font-normal text-gray-900 whitespace-nowrap">
        {n + 1}
      </td>
      <td className="py-2 px-6 text-md font-normal text-gray-900 whitespace-nowrap">
        {item.list_items.join(", ")}
      </td>
      <td className="py-2 px-6 text-md text-gray-500 whitespace-nowrap dark:text-gray-400">
        {new Date(item.date).toLocaleDateString()}
      </td>
      <td className="py-2 px-6 text-md text-gray-500 whitespace-nowrap dark:text-gray-400">
        <button
          onClick={() => handleDeleteTransaction(item.id!)}
          className="p-2 bg-red-700 font-semibold text-white rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TransactionList;
