import { useState, useEffect } from "react";
import axios from "axios";

export function useApiStatus(url: string, interval = 5000) {
  const [apiOnline, setApiOnline] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkApi = async () => {
      try {
        await axios.get(url);
        setApiOnline(true);
        setChecking(false);
      } catch {
        setApiOnline(false);
      }
    };

    const intervalId = setInterval(() => {
      if (!apiOnline) checkApi();
    }, interval);

    checkApi(); 

    return () => clearInterval(intervalId);
  }, [url]);

  return { apiOnline, checking };
}
