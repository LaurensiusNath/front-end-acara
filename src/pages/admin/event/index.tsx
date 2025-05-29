import DashboardLayout from "@/components/layouts/DashboardLayout";
import Event from "@/components/views/Admin/Event";

const AdminEventPage = () => {
  return (
    <DashboardLayout
      title="Event"
      description="List of All Events, Create New Event and Manage Existing Event"
      type="admin"
    >
      <Event />
    </DashboardLayout>
  );
};

export default AdminEventPage;
