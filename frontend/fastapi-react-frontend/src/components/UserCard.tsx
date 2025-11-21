import { useNavigate } from "react-router";
import type { TUser } from "../types";
import { formatDate, getRandomAvatar } from "../utils/helpers";
import { type UseMutateFunction } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Modal } from ".";

interface IUserCard {
  user: TUser;
  mutate: UseMutateFunction<unknown, Error, number | undefined, unknown>;
  isPending: boolean;
}

const UserCard = ({ user, mutate, isPending }: IUserCard) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card bg-base-100 w-48 shadow-sm border hover:scale-105 transition-transform duration-300">
        {showModal && (
          <Modal mutate={mutate} user={user} setShowModal={setShowModal} />
        )}
        <figure>
          <button
            className="btn absolute right-1 top-1 bg-grey border-error rounded-4xl w-10"
            onClick={() => setShowModal(true)}
          >
            🗑️
          </button>
          <img src={getRandomAvatar(user?.id)} alt="Shoes" />
        </figure>
        {isPending && (
          <div className="btn absolute w-[100%] h-[100%] opacity-50 bg-grey flex flex-col">
            <p className="text-error z-10">Deleting User</p>
            <LoadingSpinner />
          </div>
        )}
        <div className="card-body">
          <h2 className="card-title justify-center">
            {user.firstName} {user?.lastName} - {user.age}
          </h2>
          <h2 className="title text-center">
            {formatDate(user.dateOfBirth)}
          </h2>
          <div className="card-actions justify-center">
            <button
              onClick={() => {
                navigate(`users/${user.id}`);
              }}
              className="btn btn-primary"
            >
              More...
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
