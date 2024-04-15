import React, { useState } from "react";
import { userLogin } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../ui/card";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import authService from "@/appwrite/auth";
import { useNavigate } from "react-router-dom";

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
      <h2>Sign Up</h2>
      <p>
        Have an account already? <Link to="/login">Login</Link>
      </p>
      <form onSubmit={handleSubmit(handleSignup)}>
        <Input
          label="Full Name:"
          placeholder="Full Name"
          type="text"
          {...register("name", {
            required: true,
          })}
        />
        <Input
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
        <Input
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
    </Card>
  );
};

export default SignUp;
