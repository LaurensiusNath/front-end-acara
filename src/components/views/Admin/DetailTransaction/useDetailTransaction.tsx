import eventServices from "@/services/event.service";
import orderServices from "@/services/order.service";
import ticketServices from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useDetailTransaction = () => {
  const router = useRouter();
  const { query } = router;
  const getOrderById = async () => {
    const { data } = await orderServices.getOrderById(`${query.id}`);
    return data.data;
  };

  const { data: dataTransaction, isLoading: isLoadingTransaction } = useQuery({
    queryKey: ["Transaction"],
    queryFn: getOrderById,
    enabled: router.isReady,
  });

  const getEventById = async () => {
    const { data } = await eventServices.getEventById(
      `${dataTransaction?.events}`,
    );
    return data.data;
  };

  const { data: dataEvent, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["EventById"],
    queryFn: getEventById,
    enabled: !!dataTransaction?.events,
  });

  const getTicketsById = async () => {
    const { data } = await ticketServices.getTicketById(
      `${dataTransaction?.ticket}`,
    );
    return data.data;
  };

  const { data: dataTicket, isLoading: isLoadingTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketsById,
    enabled: !!dataTransaction?.ticket,
  });

  return {
    dataTransaction,
    dataEvent,
    dataTicket,
  };
};

export default useDetailTransaction;
