import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const usePayment = () => {
  const router = useRouter();
  const { order_id: orderId, status } = router.query;

  const standardizeStatus = (status: string) => {
    switch (status) {
      case "success":
        return "completed";
      case "progress":
        return "pending";
      case "failed":
        return "cancelled";
      default:
        return status;
    }
  };

  const updateOrderStatus = async () => {
    const res = await orderServices.updateOrderStatus(
      `${orderId}`,
      `${standardizeStatus(`${status}`)}`,
    );

    return res;
  };

  const { mutate: mutateUpdateOrderStatus } = useMutation({
    mutationFn: updateOrderStatus,
  });

  return {
    mutateUpdateOrderStatus,
  };
};

export default usePayment;
