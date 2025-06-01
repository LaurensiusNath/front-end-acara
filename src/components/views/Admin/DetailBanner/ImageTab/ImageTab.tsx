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
import useImageTab from "./useImageTab";
import { Controller } from "react-hook-form";
import { IBanner } from "@/types/Banner";

interface PropTypes {
  currentImage: string;
  onUpdate: (data: IBanner) => void;
  isPendingMutateUpdateBanner: boolean;
  isSuccessMutateUpdateBanner: boolean;
}

const ImageTab = (props: PropTypes) => {
  const {
    currentImage,
    onUpdate,
    isPendingMutateUpdateBanner,
    isSuccessMutateUpdateBanner,
  } = props;
  const {
    handleDeleteImage,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleUploadImage,
    controlUpdateImage,
    handleSubmitUpdateImage,
    errorsUpdateImage,
    preview,
    resetUpdateImage,
  } = useImageTab();

  useEffect(() => {
    if (isSuccessMutateUpdateBanner) {
      resetUpdateImage();
    }
  }, [isSuccessMutateUpdateBanner]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Banner Image</h1>
        <p className="w-full text-small text-default-700">
          Manage Image of this banner
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateImage(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Image
            </p>
            <Skeleton
              isLoaded={currentImage !== ""}
              className="h-32 rounded-lg"
            >
              <Image
                src={currentImage}
                alt="Image"
                fill
                className="!relative rounded-lg"
              />
            </Skeleton>
          </div>
          <Controller
            name="image"
            control={controlUpdateImage}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadImage(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isInvalid={errorsUpdateImage.image !== undefined}
                errorMessage={errorsUpdateImage.image?.message}
                isDropable
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Image
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
                isDeleting={isPendingMutateDeleteFile}
                onDelete={() => handleDeleteImage(onChange)}
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={
              isPendingMutateUploadFile ||
              isPendingMutateUpdateBanner ||
              !preview
            }
          >
            {isPendingMutateUpdateBanner ? (
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

export default ImageTab;
