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
    <tr key={n} className="bg-gray-50 odd:bg-tableOdd">
      <td className="py-2 px-6 text-md font-normal text-gray-900 whitespace-nowrap border-y-2 border-y-slate-700">
        {n + 1}
      </td>
      <td className="py-2 px-6 text-md font-normal text-gray-900 w-[30vw] border-y-2 border-y-slate-700">
        {item.list_items.join(", ")}
      </td>
      <td className="py-2 px-6 text-md text-gray-500 whitespace-nowrap border-y-2 border-y-slate-700">
        {new Date(item.date).toLocaleDateString()}
      </td>
      <td className="py-2 px-6 text-md text-gray-500 whitespace-nowrap border-y-2 border-y-slate-700">
        <button
          onClick={() => handleDeleteTransaction(item.id!)}
          className="p-2 bg-red-700 font-semibold text-white rounded border-y-2 border-y-slate-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TransactionList;
