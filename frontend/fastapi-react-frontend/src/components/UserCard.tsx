import { useNavigate } from "react-router";
import type { TUser } from "../types";
import { getRandomAvatar } from "../utils/helpers";

interface IUserCard {
  user: TUser;
}

const UserCard = ({ user }: IUserCard) => {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 w-48 shadow-sm border">
      <figure>
        <img src={getRandomAvatar()} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">
          {user.firstName} {user?.lastName} - {user.age}
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
  );
};

export default UserCard;
