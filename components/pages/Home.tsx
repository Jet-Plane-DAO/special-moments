import { useWallet } from "@meshsdk/react";
import {
  CraftingStatusEnum,
  useCraftingCampaign,
} from "@jetplane/velocity-tools";
import { useEffect } from "react";
import Layout from "../shared/Layout";
import { LoadingState } from "../shared/LoadingState";
import ButtonConnect from "../shared/ButtonConnect";

const Home = () => {
  const { wallet, connected, connecting } = useWallet();
  const { campaignConfig, check, status } = useCraftingCampaign();

  useEffect(() => {
    if (wallet && connected && status === CraftingStatusEnum.INIT) {
      check();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, connected]);

  if (!connected && connecting) {
    return (
      <div className="w-full h-screen bg-gray-10  bg-teds bg-bottom ">
        <Layout title="Connecting Wallet">
          <div className="flex justify-center items-center">
            <LoadingState />
          </div>
        </Layout>
      </div>
    );
  }

  if (!connected && !connecting) {
    return (
      <div className="w-full h-screen bg-gray-10  bg-teds bg-bottom ">
        <Layout title="">
          <div className="flex justify-center items-center">
            <ButtonConnect />
          </div>
        </Layout>
      </div>
    );
  }

  if (!campaignConfig) {
    return (
      <div className="w-full h-screen bg-gray-10  bg-teds bg-bottom ">
        <Layout title="Special Moments">
          <div className="flex justify-center items-center">
            <LoadingState />
          </div>
        </Layout>
      </div>
    );
  }
  return (
    <Layout title="Dashboard">
      <div>Start Here</div>
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  /* Fetch data here */
  const requestHeaders: HeadersInit = new Headers();

  requestHeaders.set(
    "jetplane-api-key",
    process.env.NEXT_PUBLIC_VELOCITY_API_KEY ?? ""
  );
  const res = await fetch(`${process.env.NEXT_PUBLIC_VELOCITY_API}/summary`, {
    method: "GET",
    headers: requestHeaders,
  });
  const summary = await res.json();

  return {
    props: {
      summary,
    },
    revalidate: 5 * 60,
  };
}
