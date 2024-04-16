import React from "react";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "@/appwrite/auth";
import { userLogout } from "@/features/auth/authSlice";

const ButtonsContainer = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(userLogout());
    });
  };

  // return !authStatus ? (
  //   <div className="flex items-center gap-2">
  //     <Button onClick={() => navigate("/login")} variant="outline">
  //       Log in
  //     </Button>
  //     <Button onClick={() => navigate("/signup")}>Sign Up</Button>
  //   </div>
  // ) : (
  //   <Button onClick={logoutHandler} variant="destructive">
  //     Logout
  //   </Button>
  // );
  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => navigate("/login")} variant="outline">
        Log in
      </Button>
      <Button onClick={() => navigate("/signup")}>Sign Up</Button>

      <Button onClick={logoutHandler} variant="destructive">
        Logout
      </Button>
    </div>
  );
};

export default ButtonsContainer;
