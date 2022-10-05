import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import useFetch from "../utilities/useFetch";
import { AtributeType, RecomendationType } from "../utilities/dataInterface";
import customFetch from "../utilities/customFetch";
import RecomendationsList from "../components/RecomendationsList";
import mutateData from "../utilities/mutateData";

interface GetAttributeData {
  data: Array<AtributeType>;
  error: string | null;
}

function Home() {
  const [startDate, setStartDate] = useState("2022-03-10");
  const [endDate, setEndDate] = useState("2022-03-17");
  const [result, setResult] = useState<Array<RecomendationType>>([]);

  const handleGetRecomendations = () => {
    console.log(startDate, endDate);
    customFetch(
      `/api/v2/recomendations?startDate=${startDate}&endDate=${endDate}`
    )
      .then((res) => {
        setResult(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleStoreRecomendation = () => {
    if (result.length > 0) {
      const username = localStorage.getItem("username");
      const body = {
        username,
        startDate,
        endDate,
        data: result,
      };
      mutateData("/api/v2/history", body, "POST")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  const { data }: GetAttributeData = useFetch("/api/v2/attribute", 0);
  return (
    <div className="min-h-screen">
      <p className="text-center text-2xl font-bold">Home</p>
      <div className="flex justify-center pt-7 gap-7">
        {data.map((i) => (
          <div
            key={i.id}
            className="text-center capitalize font-semibold border-2 px-5"
          >
            <p>{i.attribute}</p>
            <p>{i.priority}%</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 justify-center px-3 items-center py-12">
        <div className="flex gap-5 flex-wrap">
          <label htmlFor="startdate">Start Date</label>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border py-1 px-2 rounded border-gray focus:border-primary"
            type="date"
          />
          <label htmlFor="startdate">End Date</label>
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border py-1 px-2 rounded border-gray focus:border-primary"
            type="date"
          />
          <button
            className="bg-button text-black px-3 text-md rounded font-semibold"
            onClick={handleGetRecomendations}
          >
            <BiSearchAlt2 />
          </button>
        </div>
      </div>

      {result && (
        <div>
          <RecomendationsList
            data={result}
            handleStoreRecomendation={handleStoreRecomendation}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
