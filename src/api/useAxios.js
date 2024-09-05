import defaultAxios from "axios";
import { useCallback, useEffect, useState } from "react";

const useAxios = (options, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({ isLoading: true, error: null, data: null });

  const doFetch = useCallback(() => {
    if (!options.url) return;
    setState((state) => ({ ...state, isLoading: true }));

    axiosInstance(options)
      .then((response) => {
        setState((state) => ({ ...state, isLoading: false, data: response.data }));
      })
      .catch((error) => {
        setState((state) => ({ ...state, isLoading: false, error }));
      });
  }, [axiosInstance, options.url]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return { ...state, refetch: doFetch };
};

export default useAxios;