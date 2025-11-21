import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiFetch from "../utils/api/apiClient";
import { type TUser } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import UserCard from "./UserCard";
import { useEffect, useState } from "react";
import Alert from "./Alert";

const UserList = () => {
  const queryClient = useQueryClient();

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiFetch<TUser[]>("/users"),
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (userId?: number) =>
      apiFetch(`/users/${userId}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  useEffect(() => {
    if (!isSuccess) return;
    setShowSuccess(true);
    const timer = setTimeout(() => setShowSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) return;
    setShowError(true);
    const timer = setTimeout(() => setShowError(false), 5000);
    return () => clearTimeout(timer);
  }, [isError]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-error">Error loading users</p>;

  return (
    <>
      {showSuccess && (
        <Alert type="alert-success" text="Successfully deleted User" />
      )}
      {showError && <Alert type="alert-error" text="Failed to deleted User" />}
      {data?.map((item) => (
        <UserCard
          key={item.id}
          user={item}
          mutate={mutate}
          isPending={isPending}
        />
      ))}
    </>
  );
};

export default UserList;
