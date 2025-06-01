import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import bannerServices from "@/services/banner.service";
import { IBanner } from "@/types/Banner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { set, useForm } from "react-hook-form";
import * as yup from "yup";

const addCategorySchema = yup.object().shape({
  title: yup.string().required("Please input banner title"),
  isShow: yup.string().required("Please input banner status"),
  image: yup.mixed<FileList | string>().required("Please input banner image"),
});

const useAddBannerModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,

    handleDeleteFile,
    handleUploadFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(addCategorySchema),
  });

  const preview = watch("image");
  const fileUrl = getValues("image");

  const addBanner = async (payload: IBanner) => {
    const res = await bannerServices.addBanner(payload);
    return res;
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const handleUploadImage = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValue("image", fileUrl);
      }
    });
  };

  const handleDeleteImage = (
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const {
    mutate: mutateAddBanner,
    isPending: isPendingMutateAddBanner,
    isSuccess: isSuccessMutateAddBanner,
  } = useMutation({
    mutationFn: addBanner,
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
        message: "Success Add Banner",
      });
    },
  });

  const handleAddBanner = (data: IBanner) => mutateAddBanner(data);

  return {
    control,
    errors,
    handleSubmitForm,
    reset,
    handleAddBanner,
    isPendingMutateAddBanner,
    isSuccessMutateAddBanner,

    handleUploadImage,
    isPendingMutateUploadFile,
    preview,

    handleDeleteImage,
    isPendingMutateDeleteFile,
    handleOnClose,
  };
};

export default useAddBannerModal;
