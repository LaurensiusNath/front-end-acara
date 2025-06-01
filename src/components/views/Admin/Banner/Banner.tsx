import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import useBanner from "./useBanner";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropDownAction from "@/components/commons/DropownAction";
import { COLUMN_LISTS_BANNER } from "./Banner.constant";
import AddBannerModal from "./AddBannerModal";
import DeleteBannerModal from "./DeleteBannerModal";

const Banner = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataBanners,
    isLoadingBanners,
    isRefetchingBanners,
    refetchBanners,

    selectedId,
    setSelectedId,
  } = useBanner();

  const addBannerModal = useDisclosure();
  const deleteBannerModal = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (banner: Record<string, unknown>, columnKey: Key) => {
      const cellValue = banner[columnKey as keyof typeof banner];

      switch (columnKey) {
        case "image":
          return (
            <Image
              src={`${cellValue}`}
              alt="icon"
              width={300}
              height={200}
              className="rounded-lg"
            />
          );
        case "isShow":
          return (
            <Chip
              color={cellValue === true ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Unpublished"}
            </Chip>
          );
        case "actions":
          return (
            <DropDownAction
              onPressButtonDetail={() => push(`/admin/banner/${banner._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${banner._id}`);
                deleteBannerModal.onOpen();
              }}
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
          buttonTopContentLabel="Create Banner"
          columns={COLUMN_LISTS_BANNER}
          data={dataBanners?.data || []}
          emptyContent="No Banner Found"
          renderCell={renderCell}
          onClickButtonTopContent={addBannerModal.onOpen}
          totalPages={dataBanners?.pagination.totalPages}
          isLoading={isLoadingBanners || isRefetchingBanners}
        />
      )}
      <AddBannerModal refetchBanners={refetchBanners} {...addBannerModal} />
      <DeleteBannerModal
        {...deleteBannerModal}
        refetchBanners={refetchBanners}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Banner;
