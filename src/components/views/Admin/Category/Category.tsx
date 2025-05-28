import DataTable from "@/components/ui/DataTable";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LISTS_CATEGORY } from "./Category.constant";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

const Category = () => {
  const { push, isReady, query } = useRouter();
  const {
    setUrl,
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    currentPage,
    currentLimit,
    currentSearch,
    handleChangeLimit,
    handleChangePage,
    handleClearSearch,
    handleSearch,
    refetchCategory,
    selectedId,
    setSelectedId,
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();

  useEffect(() => {
    if (isReady) setUrl();
  }, [isReady]);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];

      switch (columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="detail-category-button"
                  onPress={() => push(`/admin/category/${category._id}`)}
                >
                  Detail Category
                </DropdownItem>
                <DropdownItem
                  key="delete-category"
                  className="text-danger-500"
                  onPress={() => {
                    setSelectedId(`${category._id}`);
                    deleteCategoryModal.onOpen();
                  }}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          buttonTopContentLabel="Create Category"
          columns={COLUMN_LISTS_CATEGORY}
          currentPage={Number(currentPage)}
          data={dataCategory?.data || []}
          emptyContent="No Category Found"
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          onChangePage={handleChangePage}
          renderCell={renderCell}
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          onClickButtonTopContent={addCategoryModal.onOpen}
          totalPages={dataCategory?.pagination.totalPages}
          isLoading={isLoadingCategory || isRefetchingCategory}
        />
      )}
      <AddCategoryModal
        refetchCategory={refetchCategory}
        {...addCategoryModal}
      />
      <DeleteCategoryModal
        {...deleteCategoryModal}
        refetchCategory={refetchCategory}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </section>
  );
};

export default Category;
