import { Asset } from "@meshsdk/core";

const useAsset = () => {
    const fetchAsset = async (item: Asset) => {
        const allocation = await fetch(`/api/assets/${item.unit}`);
        const response = await allocation.json();

        if (response.status === "address-not-found" || response.data?.status_code === 404) {
            return null;
        }
        return { ...response.data, ...item };
    };

    return { fetchAsset };
};

export default useAsset;
