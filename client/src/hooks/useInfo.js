import { useState, useEffect } from "react";
import { api } from "../config";

const useInfo = (apiUrl) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    api.get(apiUrl)
      .then((result) => {
        if (result.data.status === 'success') {
          setInfo(result.data.data.doc);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [apiUrl]);

  return { info };
};

export default useInfo;