import { UserList, AddUserForm } from "../components";

const Homepage = () => {
  return (
    <>
      <AddUserForm />

      <div className="flex justify-center items-center flex-col w-[100%]">
        <p className="card-title">Current Users</p>
        <div className="flex flex-wrap justify-center gap-4 px-5 pt-5 ">
          <UserList />
        </div>
      </div>
    </>
  );
};

export default Homepage;
