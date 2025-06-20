import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCategory from "@/components/views/Admin/DetailCategory";
import React from "react";

const AdminDetailCategoryPage = () => {
  return (
    <DashboardLayout
      title="Detail Category"
      description="Manage information for detail category"
      type="admin"
    >
      <DetailCategory />
    </DashboardLayout>
  );
};

export default AdminDetailCategoryPage;
