import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AddPost,
  AllPosts,
  EditPost,
  Home,
  Login,
  PostDetails,
  SignUp,
} from "../pages";
import { ProtectedRoute } from "@/components";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<PostDetails />} />
        <Route path="/post/edit" element={<EditPost />} />
        <Route path="/post/add" element={<AddPost />} />
        <Route path="/posts/all" element={<AllPosts />} />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <SignUp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Layout;
