import type { UseMutateFunction } from "@tanstack/react-query";
import type { TUser } from "../types";
import type { Dispatch, SetStateAction } from "react";

interface IModal {
    mutate:  UseMutateFunction<unknown, Error, number | undefined, unknown>
    setShowModal: Dispatch<SetStateAction<boolean>>
    user: TUser
}

const Modal = ({mutate, setShowModal, user}: IModal) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-primary rounded-xl shadow-lg w-full max-w-md p-6 mx-2">
        <button
          className="btn absolute right-2 top-2 bg-grey border-error rounded-4xl w-10"
          onClick={() => setShowModal(false)}
        >
          ❌
        </button>

        {/* Modal content */}
        <h2 className="text-lg font-semibold mb-4">Delete User?</h2>
        <p className="mb-4">
          Are you sure that you want to delete {user.firstName}
          {user.lastName ? ` ${user.lastName}` : ""}?
        </p>
        <button
          className="btn bg-error text-white rounded-md px-4 py-2"
          onClick={() => {
            setShowModal(false);
            mutate(user.id);
          }}
        >
          Confirm
        </button>
        <button
          className="btn bg-info rounded-md ml-2 px-4 py-2"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
