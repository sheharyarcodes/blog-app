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

  return !authStatus ? (
    <div className="flex items-center gap-2">
      <Button
        className="w-1/2"
        onClick={() => navigate("/login")}
        variant="outline"
      >
        Log in
      </Button>
      <Button className="w-1/2" onClick={() => navigate("/signup")}>
        Sign Up
      </Button>
    </div>
  ) : (
    <Button className="w-full" onClick={logoutHandler} variant="destructive">
      Logout
    </Button>
  );
};

export default ButtonsContainer;
