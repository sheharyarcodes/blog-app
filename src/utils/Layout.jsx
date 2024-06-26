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
  SearchResults,
} from "../pages";
import { ProtectedRoute } from "@/components";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<PostDetails />} />
        <Route path="/posts/all" element={<AllPosts />} />
        <Route path="/search/:searchQuery" element={<SearchResults />} />
        <Route
          path="/edit-post/:slug"
          element={
            <ProtectedRoute authentication>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/add"
          element={
            <ProtectedRoute authentication>
              <AddPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute authentication={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute authentication={false}>
              <SignUp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default Layout;
