import { Routes, Route } from "react-router";
import { Homepage, IndividualUserPage, Layout } from "./pages";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="users/:id" element={<IndividualUserPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
