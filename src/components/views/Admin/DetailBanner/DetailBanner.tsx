import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import InfoTab from "./InfoTab";
import useDetailBanner from "./useDetailBanner";
import ImageTab from "./ImageTab";

const DetailBanner = () => {
  const {
    dataBanner,
    handleUpdateBanner,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  } = useDetailBanner();
  return (
    <Tabs aria-label="Options">
      <Tab key="image" title="Image">
        <ImageTab
          currentImage={dataBanner?.image}
          onUpdate={handleUpdateBanner}
          isPendingMutateUpdateBanner={isPendingMutateUpdateBanner}
          isSuccessMutateUpdateBanner={isSuccessMutateUpdateBanner}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataBanner={dataBanner}
          onUpdate={handleUpdateBanner}
          isPendingMutateUpdateBanner={isPendingMutateUpdateBanner}
          isSuccessMutateUpdateBanner={isSuccessMutateUpdateBanner}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailBanner;
