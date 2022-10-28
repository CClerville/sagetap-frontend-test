import { useEffect, useRef, useState } from "react";
import { getArtworks } from "../api";
import { setArtwork } from "../reducers";
import { DEFAULT_ARTSWORKS } from "../utils";
import { GenericObject } from "./../reducers/index";
import { useAppDispatch } from "./util";

const useDefaultArtworks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dataFetchedRef = useRef(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const defaultArtworkIds = DEFAULT_ARTSWORKS.map(
          (artwork: GenericObject) => artwork.id
        );
        const resp = await getArtworks(defaultArtworkIds);
        const data = (await resp.json())?.data ?? [];
        dispatch(setArtwork(data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isLoading,
  };
};

export default useDefaultArtworks;
