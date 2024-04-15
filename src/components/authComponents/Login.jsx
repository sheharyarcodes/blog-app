import React, { useState } from "react";
import { userLogin } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import authService from "@/appwrite/auth";
import { useNavigate } from "react-router-dom";
import { InputComponent } from "..";

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
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Doesn't have an account? Create one by{" "}
          <Link className="font-semibold" to="/signup">
            Signing up
          </Link>
          .
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleLogin)}>
          <InputComponent
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
          <InputComponent
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
      </CardContent>
    </Card>
  );
};

export default Login;
