import InputFile from "@/components/ui/InputFile";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Spinner,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect } from "react";
import useIconTab from "./useIconTab";
import { Controller } from "react-hook-form";
import { ICategory } from "@/types/Category";

interface PropTypes {
  currentIcon: string;
  onUpdate: (data: ICategory) => void;
  isPendingMutateUpdateCategory: boolean;
  isSuccessMutateUpdateCategory: boolean;
}

const IconTab = (props: PropTypes) => {
  const {
    currentIcon,
    onUpdate,
    isPendingMutateUpdateCategory,
    isSuccessMutateUpdateCategory,
  } = props;
  const {
    handleDeleteIcon,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleUploadIcon,
    controlUpdateIcon,
    handleSubmitUpdateIcon,
    errorsUpdateIcon,
    preview,
    resetUpdateIcon,
  } = useIconTab();

  useEffect(() => {
    if (isSuccessMutateUpdateCategory) {
      resetUpdateIcon();
    }
  }, [isSuccessMutateUpdateCategory]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Category Icon</h1>
        <p className="w-full text-small text-default-700">
          Manage icon of this category
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateIcon(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">Current Icon</p>
            <Skeleton
              isLoaded={currentIcon !== ""}
              className="aspect-square rounded-lg"
            >
              <Image src={currentIcon} alt="icon" fill className="relative" />
            </Skeleton>
          </div>
          <Controller
            name="icon"
            control={controlUpdateIcon}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadIcon(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isInvalid={errorsUpdateIcon.icon !== undefined}
                errorMessage={errorsUpdateIcon.icon?.message}
                isDropable
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Icon
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
                isDeleting={isPendingMutateDeleteFile}
                onDelete={() => handleDeleteIcon(onChange)}
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={
              isPendingMutateUploadFile ||
              isPendingMutateUpdateCategory ||
              !preview
            }
          >
            {isPendingMutateUpdateCategory ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default IconTab;
