import { ToasterContext } from "@/contexts/ToasterContext";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const addCategorySchema = yup.object().shape({
  name: yup.string().required("Please input category name"),
  price: yup.string().required("Please input price"),
  quantity: yup.string().required("Please input quantity"),
  description: yup.string().required("Please input category description"),
});

const useUpdateTicketModal = (id: string) => {
  const { setToaster } = useContext(ToasterContext);
  const router = useRouter();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateTicket,
  } = useForm({
    resolver: yupResolver(addCategorySchema),
  });

  const updateTicket = async (payload: ITicket) => {
    const res = await ticketServices.updateTicket(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingMutateUpdateTicket,
    isSuccess: isSuccessMutateUpdateTicket,
  } = useMutation({
    mutationFn: updateTicket,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Success Update Ticket",
      });
    },
  });

  const handleUpdateTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateUpdateTicket(data);
  };

  return {
    control,
    errors,
    handleSubmitForm,
    reset,
    handleUpdateTicket,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
    setValueUpdateTicket,
  };
};

export default useUpdateTicketModal;
