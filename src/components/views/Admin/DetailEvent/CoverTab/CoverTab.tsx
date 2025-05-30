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
import useCoverTab from "./useCoverTab";
import { Controller } from "react-hook-form";
import { IEvent } from "@/types/Event";

interface PropTypes {
  currentCover: string;
  onUpdate: (data: IEvent) => void;
  isPendingMutateUpdateEvent: boolean;
  isSuccessMutateUpdateEvent: boolean;
}

const CoverTab = (props: PropTypes) => {
  const {
    currentCover,
    onUpdate,
    isPendingMutateUpdateEvent,
    isSuccessMutateUpdateEvent,
  } = props;
  const {
    handleDeleteCover,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,
    handleUploadCover,
    controlUpdateCover,
    handleSubmitUpdateCover,
    errorsUpdateCover,
    preview,
    resetUpdateCover,
  } = useCoverTab();

  useEffect(() => {
    if (isSuccessMutateUpdateEvent) {
      resetUpdateCover();
    }
  }, [isSuccessMutateUpdateEvent]);
  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Event Cover</h1>
        <p className="w-full text-small text-default-700">
          Manage cover of this event
        </p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitUpdateCover(onUpdate)}
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">
              Current Cover
            </p>
            <Skeleton
              isLoaded={currentCover !== ""}
              className="aspect-video rounded-lg"
            >
              <Image
                src={currentCover}
                alt="Cover"
                fill
                className="!relative rounded-lg"
              />
            </Skeleton>
          </div>
          <Controller
            name="banner"
            control={controlUpdateCover}
            render={({ field: { onChange, value, ...field } }) => (
              <InputFile
                {...field}
                onUpload={(files) => handleUploadCover(files, onChange)}
                isUploading={isPendingMutateUploadFile}
                isInvalid={errorsUpdateCover.banner !== undefined}
                errorMessage={errorsUpdateCover.banner?.message}
                isDropable
                label={
                  <p className="mb-2 text-sm font-medium text-default-700">
                    Upload New Cover
                  </p>
                }
                preview={typeof preview === "string" ? preview : ""}
                isDeleting={isPendingMutateDeleteFile}
                onDelete={() => handleDeleteCover(onChange)}
              />
            )}
          />
          <Button
            color="danger"
            className="mt-2 disabled:bg-default-500"
            type="submit"
            disabled={
              isPendingMutateUploadFile ||
              isPendingMutateUpdateEvent ||
              !preview
            }
          >
            {isPendingMutateUpdateEvent ? (
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

export default CoverTab;
