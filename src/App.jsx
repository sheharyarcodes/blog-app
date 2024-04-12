import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { userLogin, userLogout } from "./features/auth/authSlice";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(userLogin({ userData }));
      } else {
        dispatch(userLogout());
      }
    } catch (error) {
      console.log("fetchUserData :: App.jsx :: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return !loading ? <p>App</p> : <p>loading...</p>;
};

export default App;
