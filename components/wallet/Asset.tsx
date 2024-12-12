import Image from "next/image";

const WaletAsset = ({ item, action }: { item: any; action: { action: any; status: any; label: any } | null }) => {
    return (
        <div className=" bg-base-100 shadow-xl w-80 flex flex-col flex-shrink-0 rounded-xl select-none ">
            <figure className="w-25 h-25 relative h-[300px]">
                {item ? (
                    <Image className="rounded-t-xl" src={`https://ipfs.blockfrost.dev/ipfs/${(item?.image || "").replace("ipfs://", "")}`} width={400} height={400} alt="Shoes"></Image>
                ) : (
                    <div className="flex h-full w-full justify-center items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}
            </figure>
            <div className="flex flex-col justify-center text-sm text-neutral-content p-5 space-y-2">
                <div className="flex w-full justify-between text-2xl text-white">
                    <p>{item?.name || "???"}</p>
                    {item && <p>{item?.xp}XP</p>}
                </div>
                <p>{item?.stat}</p>
                <button className="btn" onClick={() => action?.action(item)}>
                    {action && action.label(item)}
                </button>
            </div>
        </div>
    );
};
export { WaletAsset };
