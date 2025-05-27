import DashboardLayout from "@/components/layouts/DashboardLayout";
import Category from "@/components/views/Admin/Category";

const AdminCategoryPage = () => {
  return (
    <DashboardLayout
      title="Category"
      description="List of All Categories, Create New Category and Manage Existing Category"
      type="admin"
    >
      <Category />
    </DashboardLayout>
  );
};

export default AdminCategoryPage;
