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
import { Link, useNavigate } from "react-router-dom";
import { InputComponent } from "..";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");

  const handleSignup = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(userLogin(userData));
        navigate("/");
        reset();
      }
    } catch (error) {
      setError(error.message);
      console.log("signup-component:" + error);
    }
  };

  return (
    <Card className="max-w-[370px] flex-1">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          Already have an account?{" "}
          <Link className="font-semibold hover:underline" to="/login">
            Login
          </Link>{" "}
          instead.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleSignup)}
        >
          <InputComponent
            label="Full Name:"
            placeholder="Full Name"
            {...register("name", {
              required: true,
              minLength: {
                value: 3,
                message: "Full-Name must be at least 3 characters long",
              },
              maxLength: {
                value: 40,
                message: "Full-Name must be below 40 characters",
              },
              validate: {
                noNumbersOrSpecialChars: (value) => {
                  const pattern = /^[a-zA-Z\s]*$/;
                  return (
                    pattern.test(value) ||
                    "Full Name cannot contain numbers or special characters"
                  );
                },
              },
            })}
          />
          <InputComponent
            label="Email:"
            placeholder="Email"
            type="email"
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: {
                value: 52,
                message: "Password must be below 52 characters",
              },
              // validate: (value) => {
              //   const pattern =
              //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
              //   return (
              //     pattern.test(value) ||
              //     "Password must include lower, upper, number, and special characters"
              //   );
              // },
            })}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
          {error && (
            <p className="text-red-600 px-2 text-xs text-justify font-semibold">
              {error}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
