import { useState } from "react";

import { BiSearchAlt2 } from "react-icons/bi";

interface TransactionNavbarProps {
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TransactionNavbar = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setShowModal,
}: TransactionNavbarProps) => {
  const [firstDate, setFirstDate] = useState(startDate);
  const [secondDate, setSecondDate] = useState(endDate);

  const handleSearchingDate = () => {
    setStartDate(firstDate);
    setEndDate(secondDate);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-between px-3 items-center ">
      <div className="flex gap-5 flex-wrap">
        <button
          onClick={() => setShowModal(true)}
          className="py-1 px-2 bg-blue-500 rounded text-white font-semibold border-2 border-black"
        >
          + Insert Transaction
        </button>
        <label htmlFor="startdate" className="font-semibold">
          Start Date
        </label>
        <input
          value={firstDate}
          onChange={(e) => setFirstDate(e.target.value)}
          className="py-1 px-2 rounded border-gray focus:border-primary border-2 border-black"
          type="date"
        />
        <label htmlFor="startdate" className="font-semibold">
          End Date
        </label>
        <input
          value={secondDate}
          onChange={(e) => setSecondDate(e.target.value)}
          className="py-1 px-2 rounded border-gray focus:border-primary border-2 border-black"
          type="date"
        />
        <button
          className="bg-button text-black px-3 text-md rounded font-semibold"
          onClick={handleSearchingDate}
        >
          <BiSearchAlt2 />
        </button>
      </div>
    </div>
  );
};

export default TransactionNavbar;
