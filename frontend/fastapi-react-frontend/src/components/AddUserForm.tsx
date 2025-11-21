import { useEffect, useState } from "react";
import { workOutAge } from "../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiFetch from "../utils/api/apiClient";
import type { TUser } from "../types";
import LoadingSpinner from "./LoadingSpinner";

const AddUserForm = () => {
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const calculatedAge = workOutAge(date);
    setAge(calculatedAge);
  }, [date]);

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newUser: Omit<TUser, "id" | "age">) =>
      apiFetch<TUser>("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      setDate("")
      setFirstName("")
      setLastName("")
      setAge(0)
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleCreate = () => {
    if (!date || !firstName || firstName.length > 30 || lastName.length > 30) {
      setShowError(true)
      return
    }
    setShowError(false)
    mutate({ firstName, lastName, dateOfBirth: date });
  };

  return (
    <div className="flex flex-col gap-2 py-10 w-[100%] justify-items-center items-center">
      <p className="card-title" data-testid="add-user-form">Add a User</p>
      <input
        type="text"
        className="input validator"
        required
        placeholder="First name"
        pattern="[A-Za-z][A-Za-z0-9\-]*"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        maxLength={30}
        title="Only letters, numbers or dash"
      />
      <input
        type="text"
        className="input validator"
        required
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        placeholder="Last name"
        pattern="[A-Za-z][A-Za-z0-9\-]*"
        maxLength={30}
        title="Only letters, numbers or dash"
      />
      <input
        data-testid="date-input"
        type="date"
        className="input"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        className="input validator"
        disabled
        value={age}
        placeholder="Age"
      />
      {showError && <p className="text-error">All fields must have a value and names can be no longer than 30 characters</p>}
      <button onClick={handleCreate} className="btn btn-primary">
        {isPending ? <LoadingSpinner /> : "Submit"}
      </button>
      {isError && <p className="text-error">Error creating user: Try again!</p>}
      {showSuccess && <p className="text-success">User Created!</p>}
    </div>
  );
};

export default AddUserForm;
