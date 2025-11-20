import { useQuery } from "@tanstack/react-query";
import apiFetch from "../utils/api/apiClient";
import { type TUser } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import UserCard from "./UserCard";

const UserList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiFetch<TUser[]>("/users"),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>Error loading users</p>;

  return (
    <>
      {data?.map((item) => (
        <UserCard key={item.id} user={item} />
      ))}
    </>
  );
};


export default UserList;
