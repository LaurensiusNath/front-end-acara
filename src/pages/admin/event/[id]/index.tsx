import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailEvent from "@/components/views/Admin/DetailEvent";
import React from "react";

const AdminDetailEventPage = () => {
  return (
    <DashboardLayout
      title="Detail Event"
      description="Manage information for detail event"
      type="admin"
    >
      <DetailEvent />
    </DashboardLayout>
  );
};

export default AdminDetailEventPage;
