import DropDownAction from "@/components/commons/DropownAction";
import DataTable from "@/components/ui/DataTable";
import { convertIDR } from "@/utils/currency";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { Fragment, Key, ReactNode, useCallback, useState } from "react";
import useTicketTab from "./useTicketTab";
import { COLUMN_LISTS_TICKET } from "./TicketTab.constants";
import AddTicketModal from "./AddTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";
import { ITicket } from "@/types/Ticket";
import { set } from "react-hook-form";

const TicketTab = () => {
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();
  const { dataTicket, isPendingTicket, isRefetchingTicket, refetchTicket } =
    useTicketTab();

  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(
    null,
  );

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;

        case "actions":
          return (
            <DropDownAction
              onPressButtonDetail={() => {
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedDataTicket(ticket as ITicket);
                deleteTicketModal.onOpen();
              }}
            />
          );

        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <Fragment>
      <Card className="w-full p-4">
        <CardHeader className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Event Ticket</h1>
            <p className="w-full text-small text-default-700">
              Manage ticket of this Event
            </p>
          </div>
          <Button onPress={addTicketModal.onOpen} color="danger">
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            columns={COLUMN_LISTS_TICKET}
            data={dataTicket || []}
            emptyContent="No Ticket Found"
            renderCell={renderCell}
            showSearch={false}
            showLimit={false}
            totalPages={1}
            isLoading={isPendingTicket || isRefetchingTicket}
          />
        </CardBody>
      </Card>
      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />
      <DeleteTicketModal
        {...deleteTicketModal}
        refetchTicket={refetchTicket}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
      />
    </Fragment>
  );
};

export default TicketTab;
