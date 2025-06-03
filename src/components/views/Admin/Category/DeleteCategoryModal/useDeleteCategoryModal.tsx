import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import categoryServices from "@/services/category.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteCategoryModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteCategory = async (id: string) => {
    const res = await categoryServices.deleteCategory(id);
    return res;
  };

  const {
    mutate: mutateDeleteCategory,
    isPending: isPendingMutateDeleteCategory,
    isSuccess: isSuccessMutateDeleteCategory,
  } = useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success Delete Category",
      });
    },
  });

  return {
    mutateDeleteCategory,
    isPendingMutateDeleteCategory,
    isSuccessMutateDeleteCategory,
  };
};

export default useDeleteCategoryModal;
