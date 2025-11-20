import { Outlet } from "react-router";
import { Footer, Header } from "../components";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* main grows to push footer down */}
      <main className="flex-grow max-w-[1500px] w-[100%] mx-auto p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
