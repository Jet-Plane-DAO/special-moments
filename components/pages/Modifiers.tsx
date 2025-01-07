import { useWallet } from "@meshsdk/react";
import {
  CraftingStatusEnum,
  useCraftingCampaign,
} from "@jetplane/velocity-tools";
import { useEffect } from "react";
import { Activity } from "../home/Activity";
import { Leaderboard } from "../home/Leaderboard";
import { CraftableMaterials } from "../home/CraftableMaterials";
import { Stats } from "../home/Stats";
import Layout from "../shared/Layout";
import { config } from "../../helpers/config";

const Modifiers = () => {
  const { wallet, connected } = useWallet();
  const { campaignConfig, check, status } = useCraftingCampaign();

  useEffect(() => {
    if (wallet && connected && status === CraftingStatusEnum.INIT) {
      check();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, connected]);

  return (
    <Layout title={config.modifiersTitle}>
      {/* <Activity /> */}
      <div className="grid grid-cols-12 gap-5">
        {/* <Leaderboard />
        <CraftableMaterials />
        <Stats /> */}
      </div>
    </Layout>
  );
};

export default Modifiers;
