import { useState, useEffect } from "react";
const base_url = "http://localhost:8000";

const useFetch = (url: string, changes: number) => {
  const [data, setData] = useState<Array<any>>([]);
  const [totalData, setTotalData] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    setError(null);
    fetch(`${base_url + url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          fetch(`${base_url}/auth/refreshToken`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh_token,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "access_token",
                `${result.data.access_token}`
              );
              localStorage.setItem(
                "refresh_token",
                `${result.data.refresh_token}`
              );
              setRefresh((current) => current + 1);
            });
        }

        if (!res.ok) {
          throw new Error("fetch data failed");
        }

        return res.json();
      })
      .then((result) => {
        setTotalData(result.data.count);
        setData(result.data.rows);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [url, changes, refresh]);

  return { data, error, totalData };
};

export default useFetch;
