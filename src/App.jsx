import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { userLogin, userLogout } from "./features/auth/authSlice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(userLogin({ userData }));
        } else {
          dispatch(userLogout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? <p>App</p> : <p>loading...</p>;
};

export default App;
