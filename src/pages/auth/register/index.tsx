import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register";

import React from "react";

const RegisterPage = () => {
  return (
    <AuthLayout title="Acara | Register">
      <Register />
    </AuthLayout>
  );
};

export default RegisterPage;
