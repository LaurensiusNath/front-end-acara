import categoryServices from "@/services/category.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const eventSchema = yup.object().shape({
  category: yup.string(),
  isOnline: yup.string(),
  isFeatured: yup.string(),
});

const useEventFilter = () => {
  const { control, reset, watch, getValues, setValue } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const { data: dataCategory, isSuccess: isSuccessGetCategory } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategories(),
  });

  return {
    control,
    dataCategory,
    isSuccessGetCategory,
    setValue,
  };
};

export default useEventFilter;
