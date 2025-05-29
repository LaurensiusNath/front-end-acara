import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import IconTab from "./IconTab";
import InfoTab from "./InfoTab";
import useDetailCategory from "./useDetailCategory";

const DetailCategory = () => {
  const {
    dataCategory,
    handleUpdateCategory,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = useDetailCategory();
  return (
    <Tabs aria-label="Options">
      <Tab key="icon" title="Icon">
        <IconTab
          currentIcon={dataCategory?.icon}
          onUpdate={handleUpdateCategory}
          isPendingMutateUpdateCategory={isPendingMutateUpdateCategory}
          isSuccessMutateUpdateCategory={isSuccessMutateUpdateCategory}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataCategory={dataCategory}
          onUpdate={handleUpdateCategory}
          isPendingMutateUpdateCategory={isPendingMutateUpdateCategory}
          isSuccessMutateUpdateCategory={isSuccessMutateUpdateCategory}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailCategory;
