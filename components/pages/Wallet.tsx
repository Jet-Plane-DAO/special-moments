import { useWallet } from "@meshsdk/react";
import {
  CraftingStatusEnum,
  useCraftingCampaign,
} from "@jetplane/velocity-tools";
import { useCallback, useEffect, useState } from "react";
import Layout from "../shared/Layout";
import { Assets } from "../wallet/Assets";
import { Inventory } from "../wallet/Inventory";
import { History } from "../wallet/History";
// import { CompilePlans } from "../wallet/CompilePlans";
import { Stats } from "../wallet/Stats";
import { useCraftableAsset } from "../hooks/useCraftableAsset";

const Wallet = () => {
  const { wallet, connected } = useWallet();
  const { campaignConfig, check, status, craftingData } =
    useCraftingCampaign("materials");
  const {
    campaignConfig: planCampaignConfig,
    check: planCheck,
    status: planStatus,
  } = useCraftingCampaign("schematics");

  const { getCraftableAction } = useCraftableAsset({ craftingData });

  const [inputPolicyId, setInputPolicyId] = useState(null);
  const [planPolicyId, setPlanPolicyId] = useState(null);

  useEffect(() => {
    if (planCampaignConfig) {
      if (planCampaignConfig.inputs?.length) {
        setPlanPolicyId(planCampaignConfig.policyId);
      }
      // check();
    }
  }, [campaignConfig, planCampaignConfig]);

  useEffect(() => {
    if (campaignConfig) {
      if (campaignConfig.inputs?.length) {
        setInputPolicyId(campaignConfig.inputs[0]?.policyId);
      }
      // check();
    }
  }, [campaignConfig]);

  useEffect(() => {
    if (wallet && connected && status === CraftingStatusEnum.INIT) {
      check();
      planCheck();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, connected]);

  return (
    <Layout title="My Adventure">
      {/* <Activity /> */}
      {!campaignConfig ? (
        <div className="p-10 w-full flex justify-center">
          <progress className="progress w-56" />
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-5 h-auto">
          <>
            <div className="col-span-9 mt-4">
              {inputPolicyId && (
                <Assets
                  policyId={inputPolicyId}
                  title="My Adventurers"
                  action={(item: any) => getCraftableAction(item)}
                />
              )}
              {planPolicyId && (
                <Assets
                  policyId={planPolicyId}
                  title="Schematics"
                  action={(item: any) => getCraftableAction(item)}
                />
              )}
              <Inventory />
            </div>
            <div className="col-span-3 my-10">
              <Stats />
              <History />
            </div>
          </>
        </div>
      )}
    </Layout>
  );
};

export default Wallet;
