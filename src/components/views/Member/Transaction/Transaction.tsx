import DataTable from "@/components/ui/DataTable";
import { Chip } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropDownAction from "@/components/commons/DropownAction";
import useTransaction from "./useTransaction";
import { COLUMN_LISTS_TRANSACTION } from "./Transaction.constant";
import { convertIDR } from "@/utils/currency";

const Transaction = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,
  } = useTransaction();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              color={
                cellValue === "completed"
                  ? "success"
                  : cellValue === "pending"
                    ? "warning"
                    : "danger"
              }
              size="sm"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip>
          );
        case "total":
          return `${convertIDR(Number(cellValue))}`;
        case "actions":
          return (
            <DropDownAction
              onPressButtonDetail={() =>
                push(`/member/transaction/${transaction?.orderId}`)
              }
              hideButtonDelete
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_TRANSACTION}
          data={dataTransactions?.data || []}
          emptyContent="Transaction is empty"
          renderCell={renderCell}
          totalPages={dataTransactions?.pagination.totalPages}
          isLoading={isLoadingTransactions || isRefetchingTransactions}
        />
      )}
    </section>
  );
};

export default Transaction;
