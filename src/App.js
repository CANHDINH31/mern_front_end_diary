import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppReducer from "./reducers/AppReducer";
import { useCallback, useEffect, useReducer } from "react";
import AppContext from "./components/AppContext";
import axios from "axios";
function App() {
  const initialState = {
    user: null,
    posts: [],
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const checkCurrentUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const option = {
        method: "get",
        url: "/api/v1/auth",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const respone = await axios(option);
      if (respone.data.data.user) {
        const { userName } = respone.data.data.user;
        dispatch({ type: "CURRENT_USER", payload: { userName } });
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  useEffect(() => {
    checkCurrentUser();
  }, [checkCurrentUser]);
  return (
    <Router>
      <AppContext.Provider value={{ state, dispatch }}>
        <div className="container ">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Main />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
