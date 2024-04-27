import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { userLogin, userLogout } from "./features/auth/authSlice";
import { Footer, Header, Spinner } from "./components";
import Layout from "./utils/Layout";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(userLogin(userData));
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

  return !loading ? (
    <div className="min-h-screen ">
      <Header />
      <hr className="border-black" />
      <main>
        <Layout />
      </main>
      <hr className="border-black" />
      <Footer />
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <Spinner></Spinner>
    </div>
  );
};

export default App;
