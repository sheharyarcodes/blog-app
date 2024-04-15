import React, { useState } from "react";
import { userLogin } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../ui/card";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import authService from "@/appwrite/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(userLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Card>
      <h2>Login</h2>
      <p>
        Doesn't have an account? Create one by{" "}
        <Link to="/signup">Signing up</Link>.
      </p>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Input
          label="Email:"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid email address",
            },
          })}
        />
        <Input
          label="Password:"
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
            pattern: {
              value:
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
              message: "Invalid password",
            },
          })}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;
