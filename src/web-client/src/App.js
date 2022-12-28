import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Signup from "./pages/signup/Signup";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { sensorInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { UserAuth } from "./context/AuthContext";
import { DataContextProvider } from "./context/DataContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = UserAuth();

  const RequireAuth = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  // console.log(user);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="sensors">
              <Route
                index
                element={
                  <RequireAuth>
                    <DataContextProvider>
                      <List />
                    </DataContextProvider>
                  </RequireAuth>
                }
              />
              <Route
                path=":sensorId"
                element={
                  <RequireAuth>
                    <DataContextProvider>
                      <Single />
                    </DataContextProvider>
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <DataContextProvider>
                      <New inputs={sensorInputs} title="Add New Sensor" />
                    </DataContextProvider>
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
