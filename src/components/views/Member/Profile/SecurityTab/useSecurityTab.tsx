import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import { IUpdatePassword } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePassword = yup.object().shape({
  oldPassword: yup.string().required("Please input your old password"),
  password: yup.string().required("Please input your new password"),
  confirmPassword: yup
    .string()
    .required("Please input your new password confirmation"),
});

const useSecurityTab = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control: controlUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    formState: { errors: errorsUpdatePassword },
    reset: resetUpdatePassword,
    setValue: setValueUpdatePassword,
  } = useForm({
    resolver: yupResolver(schemaUpdatePassword),
  });

  const updatePassword = async (payload: IUpdatePassword) => {
    const { data } = await authServices.updatePassword(payload);
    return data.data;
  };

  const { mutate: mutateUpdatePassword, isPending: isPendingUpdatePassword } =
    useMutation({
      mutationFn: (payload: IUpdatePassword) => updatePassword(payload),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
      onSuccess: () => {
        resetUpdatePassword({
          oldPassword: "",
          password: "",
          confirmPassword: "",
        });
        setToaster({
          type: "success",
          message: "Update password successfully",
        });
      },
    });

  const handleUpdatePassword = (data: IUpdatePassword) =>
    mutateUpdatePassword(data);

  return {
    controlUpdatePassword,
    handleSubmitUpdatePassword,
    errorsUpdatePassword,
    resetUpdatePassword,
    setValueUpdatePassword,

    isPendingUpdatePassword,
    handleUpdatePassword,
  };
};

export default useSecurityTab;
