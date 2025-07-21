import { authUser } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import React from 'react';

const useAuthUser = () => {
  const { data: authData, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: authUser,
    retry: false
  });

  return { isLoading, authUser: authData?.user };
};

export default useAuthUser;
