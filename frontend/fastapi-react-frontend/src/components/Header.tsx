const Header = () => {
  return (
    <div data-testid="header" className="navbar bg-base-300 shadow-sm w-full">
      <div className="w-[100%] max-w-[1500px] mx-auto flex">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost text-xl">
            FastAPI-React
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
