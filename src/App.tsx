import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

import generateRoutes from "./routes/generateRoutes";
import { useContext } from "react";
import { AuthContext } from "./provider/authProvider";
import { Toaster } from "react-hot-toast";

function App() {
  const { role } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {generateRoutes({ role })}
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
        <Toaster
          toastOptions={{
            position: "bottom-right",
            duration: 2000
          }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
