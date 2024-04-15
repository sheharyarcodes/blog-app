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

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleSignup = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
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
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          Have an account already?{" "}
          <Link className="font-semibold" to="/login">
            Login
          </Link>{" "}
          instead.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSignup)}>
          <InputComponent
            label="Full Name:"
            placeholder="Full Name"
            type="text"
            {...register("name", {
              required: true,
            })}
          />
          <InputComponent
            label="Email:"
            placeholder="Email"
            type="email"
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
            placeholder="Password"
            type="password"
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
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
