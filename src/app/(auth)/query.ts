import { useQuery } from "@tanstack/react-query";
import { getUser } from "app/(auth)/actions";

export const useUserQuery = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
