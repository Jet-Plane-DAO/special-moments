import { Asset } from "@meshsdk/core";
import { useAssets } from "@meshsdk/react";
import { useCallback, useEffect, useState } from "react";

const useAsset = () => {
    const [myAssets, setMyAssets] = useState<any>(null);
    const assets = useAssets();
    const fetchAsset = useCallback(async (item: Asset) => {
        const allocation = await fetch(`/api/assets/${item.unit}`);
        const response = await allocation.json();
        if (response.status === "address-not-found" || response.data?.status_code === 404) {
            return null;
        }
        return { ...response.data, ...item };
    }, [])


    useEffect(() => {
        if (assets) {
            Promise.all(
                assets.map((item: Asset) => {
                    return fetchAsset(item);
                })
            ).then((data) => {
                setMyAssets(data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assets]);

    return { fetchAsset, myAssets };
};

export default useAsset;
