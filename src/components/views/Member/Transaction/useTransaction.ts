import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useTransaction = () => {
    const router = useRouter();
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getMemberTransactionss = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
        const res = await orderServices.getMemberOrder(params)
        const { data } = res;
        return data
    }

    const {
        data: dataTransactions,
        isLoading: isLoadingTransactions,
        isRefetching: isRefetchingTransactions,
        refetch: refetchTransactions
    } = useQuery({
        queryKey: ["MemberTransaction", currentLimit, currentPage, currentSearch],
        queryFn: () => getMemberTransactionss(),
        enabled: router.isReady && !!currentPage && !!currentLimit
    })

    return {
        dataTransactions,
        isLoadingTransactions,
        isRefetchingTransactions,
        refetchTransactions,
    }
};

export default useTransaction;