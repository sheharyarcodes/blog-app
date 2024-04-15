import React from "react";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "@/features/auth/authSlice";

const ButtonsContainer = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => navigate("/login")} variant="outline">
        Log in
      </Button>
      <Button onClick={() => navigate("/signup")}>Sign Up</Button>
      <Button onClick={() => navigate("/")} variant="destructive">
        Logout
      </Button>
    </div>
  );
};

export default ButtonsContainer;
