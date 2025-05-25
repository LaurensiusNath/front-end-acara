import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login";
import React from "react";

const LoginPage = () => {
  return (
    <AuthLayout title="Acara | Login">
      <Login />
    </AuthLayout>
  );
};

export default LoginPage;
