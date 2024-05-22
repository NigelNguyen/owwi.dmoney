import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import generateRoutes from "./routes/generateRoutes";
import { useContext } from "react";
import { AuthContext } from "./provider/authProvider";

function App() {
  const { role } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {generateRoutes({ role })}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
