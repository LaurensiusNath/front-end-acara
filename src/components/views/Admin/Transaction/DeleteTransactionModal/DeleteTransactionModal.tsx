import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTransactionModal from "./useDeleteTransactionModal";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchTransactions: () => void;
  onOpenChange: () => void;
  selectedId: string;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

const DeleteTransactionModal = (props: PropTypes) => {
  const {
    isOpen,
    onOpenChange,
    onClose,
    refetchTransactions,
    selectedId,
    setSelectedId,
  } = props;

  const {
    isPendingMutateDeleteTransaction,
    isSuccessMutateDeleteTransaction,
    mutateDeleteTransaction,
  } = useDeleteTransactionModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTransaction) {
      onClose();
      refetchTransactions();
      setSelectedId("");
    }
  }, [isSuccessMutateDeleteTransaction]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Transaction</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure, you want to delete this transaction?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId("");
            }}
            disabled={isPendingMutateDeleteTransaction}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTransaction}
            onPress={() => {
              mutateDeleteTransaction(selectedId);
            }}
          >
            {isPendingMutateDeleteTransaction ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Transaction"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTransactionModal;
