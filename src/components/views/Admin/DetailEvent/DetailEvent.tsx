import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import InfoTab from "./InfoTab";
import useDetailEvent from "./useDetailEvent";
import CoverTab from "./CoverTab";
import LocationTab from "./LocationTab";
import TicketTab from "./TicketTab";

const DetailEvent = () => {
  const {
    dataEvent,
    handleUpdateEvent,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
    handleUpdateInfo,
    handleUpdateLocation,
    dataDefaultRegion,
    isPendingDefaultRegion,
  } = useDetailEvent();
  return (
    <Tabs aria-label="Options">
      <Tab key="cover" title="Cover">
        <CoverTab
          currentCover={dataEvent?.banner}
          onUpdate={handleUpdateEvent}
          isPendingMutateUpdateEvent={isPendingMutateUpdateEvent}
          isSuccessMutateUpdateEvent={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="info" title="Info">
        <InfoTab
          dataEvent={dataEvent}
          onUpdate={handleUpdateInfo}
          isPendingMutateUpdateEvent={isPendingMutateUpdateEvent}
          isSuccessMutateUpdateEvent={isSuccessMutateUpdateEvent}
        />
      </Tab>

      <Tab key="location" title="Location">
        <LocationTab
          dataDefaultRegion={dataDefaultRegion?.data?.data[0]?.name}
          isPendingDefaultRegion={isPendingDefaultRegion}
          dataEvent={dataEvent}
          onUpdate={handleUpdateLocation}
          isPendingMutateUpdateEvent={isPendingMutateUpdateEvent}
          isSuccessMutateUpdateEvent={isSuccessMutateUpdateEvent}
        />
      </Tab>
      <Tab key="ticket" title="Ticket">
        <TicketTab />
      </Tab>
    </Tabs>
  );
};

export default DetailEvent;
