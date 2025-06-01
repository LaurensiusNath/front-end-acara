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
import React, { Key, ReactNode, useCallback } from "react";
import { COLUMN_LISTS_TICKET } from "./TicketTab.contants";
import useTicketTab from "./useTicketTab";

const TicketTab = () => {
  const addTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();
  const { dataTicket, isPendingTicket, isRefetchingTicket, refetchTicket } =
    useTicketTab();

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
    <Card className="w-full p-4">
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <h1 className="w-full text-xl font-bold">Event Ticket</h1>
          <p className="w-full text-small text-default-700">
            Manage ticket of this Event
          </p>
        </div>
        <Button color="danger">Add New Ticket</Button>
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
  );
};

export default TicketTab;
